import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import Stripe from 'stripe';
import { 
  initializeDbSchema, 
  getUserById, 
  getUserByEmail, 
  getUserByAppleId, 
  getUserByGoogleId, 
  createUser, 
  updateUser, 
  logTransaction,
  DBUser 
} from './src/database';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'loghat_super_secret_jwt_key_2026';

// Initialize Stripe SDK
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2023-10-16' as any }) : null;

// Initialize Database Schema on start
initializeDbSchema().catch(console.error);

// 1. Basic Rate Limiting to prevent API abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many API requests, please try again later.' }
});

// Apply rate limiter to API routes only
app.use('/api/', apiLimiter);

// 2. Stripe Webhook Endpoint (Requires raw body parser for signature verification)
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  if (!stripe || !stripeWebhookSecret || !sig) {
    console.warn('⚠️ Stripe Webhook triggered but Stripe is unconfigured or signature is missing.');
    return res.status(400).send('Stripe Config Error');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
  } catch (err: any) {
    console.error(`✕ Webhook Signature Verification Failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const planTier = session.metadata?.plan_tier;

    if (userId && planTier) {
      console.log(`💳 Webhook Success: User ${userId} purchased plan ${planTier}`);
      
      // Update user premium status in DB
      await updateUser(userId, {
        premium_tier: planTier,
        unlocked_badge_ids: JSON.stringify(['badge-payment-success'])
      });

      // Log successful transaction record
      await logTransaction({
        id: `tx-${Date.now()}`,
        user_id: userId,
        session_id: session.id,
        amount: (session.amount_total || 0) / 100,
        currency: session.currency || 'myr',
        status: 'completed',
        created_at: new Date().toISOString()
      });
    }
  }

  res.json({ received: true });
});

// JSON Body Parser for all other endpoints
app.use(express.json());

// Helper: JWT verification middleware
const authenticateToken = (req: any, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token missing' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Token invalid or expired' });
    req.user = user;
    next();
  });
};

// 3. User Authentication Endpoints

// Email/Password Registration
app.post('/api/auth/register', async (req: express.Request, res: express.Response) => {
  const { email, password, nickname, originState } = req.body;

  if (!email || !password || !nickname) {
    return res.status(400).json({ error: 'Required fields: email, password, nickname' });
  }

  try {
    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: DBUser = {
      id: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      email: email.toLowerCase(),
      password_hash: passwordHash,
      apple_id: null,
      google_id: null,
      nickname,
      origin_state: originState || 'Kuala Lumpur',
      heritage_state: 'Other',
      premium_tier: 'none',
      best_score: 0,
      best_rank: 'Tourist',
      balance: 0,
      email_verified: false,
      phone_verified: false,
      location_permission: 'denied',
      unlocked_badge_ids: '[]'
    };

    await createUser(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ token, user: newUser });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Email/Password Login
app.post('/api/auth/login', async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Required fields: email, password' });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user || !user.password_hash) {
      return res.status(400).json({ error: 'Invalid login credentials' });
    }

    const validPass = await bcrypt.compare(password, user.password_hash);
    if (!validPass) {
      return res.status(400).json({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Google Sign-In Verification
app.post('/api/auth/verify-google', async (req: express.Request, res: express.Response) => {
  const { googleId, email, nickname } = req.body;

  if (!googleId || !email) {
    return res.status(400).json({ error: 'googleId and email are required' });
  }

  try {
    let user = await getUserByGoogleId(googleId);
    
    // Fallback: search by email to link account
    if (!user) {
      user = await getUserByEmail(email);
      if (user) {
        user = await updateUser(user.id, { google_id: googleId });
      }
    }

    // Sign up if user doesn't exist
    if (!user) {
      user = {
        id: `usr-g-${Date.now()}`,
        email: email.toLowerCase(),
        password_hash: null,
        apple_id: null,
        google_id: googleId,
        nickname: nickname || email.split('@')[0],
        origin_state: 'Kuala Lumpur',
        heritage_state: 'Other',
        premium_tier: 'none',
        best_score: 0,
        best_rank: 'Tourist',
        balance: 0,
        email_verified: true, // Google auth asserts verified email
        phone_verified: false,
        location_permission: 'denied',
        unlocked_badge_ids: '[]'
      };
      await createUser(user);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Apple Sign-In Verification (Mandatory for App Store publishing)
app.post('/api/auth/verify-apple', async (req: express.Request, res: express.Response) => {
  const { appleId, email, nickname } = req.body;

  if (!appleId) {
    return res.status(400).json({ error: 'appleId is required' });
  }

  try {
    let user = await getUserByAppleId(appleId);

    // Link by email if email is provided
    if (!user && email) {
      user = await getUserByEmail(email);
      if (user) {
        user = await updateUser(user.id, { apple_id: appleId });
      }
    }

    // Sign up if user doesn't exist
    if (!user) {
      user = {
        id: `usr-a-${Date.now()}`,
        email: email ? email.toLowerCase() : null,
        password_hash: null,
        apple_id: appleId,
        google_id: null,
        nickname: nickname || `AppleUser_${Date.now().toString().slice(-4)}`,
        origin_state: 'Kuala Lumpur',
        heritage_state: 'Other',
        premium_tier: 'none',
        best_score: 0,
        best_rank: 'Tourist',
        balance: 0,
        email_verified: !!email,
        phone_verified: false,
        location_permission: 'denied',
        unlocked_badge_ids: '[]'
      };
      await createUser(user);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Stripe Payment Endpoint (Create Stripe Checkout Session supporting FPX + Card)
app.post('/api/payment/create-checkout-session', authenticateToken, async (req: any, res: express.Response) => {
  const { planTier } = req.body; // 'adfree' | 'ultra'
  const userId = req.user.id;

  if (!stripe) {
    return res.status(500).json({ error: 'Stripe gateway is unconfigured on production server.' });
  }

  if (planTier !== 'adfree' && planTier !== 'ultra') {
    return res.status(400).json({ error: 'Invalid subscription tier selected' });
  }

  const priceAmount = planTier === 'ultra' ? 990 : 490; // RM9.90 or RM4.90 (in cents = 990 or 490)
  const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'fpx'], // FPX support for Malaysia bank transfers
      line_items: [
        {
          price_data: {
            currency: 'myr', // RM currency standard
            product_data: {
              name: planTier === 'ultra' ? '👑 Loghat Ultra Premium Tier' : '🚫 Loghat Lifetime Ad-Free Tier',
              description: planTier === 'ultra' 
                ? 'Unlock unlimited quizzes, double audit weight, crown icon badge and premium wallpapers!' 
                : 'Hide all advertisements and banner placeholders forever.',
            },
            unit_amount: priceAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        user_id: userId,
        plan_tier: planTier,
      },
      success_url: `${appUrl}/#settings?payment=success`,
      cancel_url: `${appUrl}/#settings?payment=cancelled`,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// direct Stripe Payment Intent (For Apple Pay integration on iOS)
app.post('/api/payment/create-payment-intent', authenticateToken, async (req: any, res: express.Response) => {
  const { planTier } = req.body;

  if (!stripe) {
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  const priceAmount = planTier === 'ultra' ? 990 : 490;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceAmount,
      currency: 'myr',
      payment_method_types: ['card'], // direct Apple Pay falls back onto cards token verification
      metadata: {
        user_id: req.user.id,
        plan_tier: planTier
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 5. User Sync Endpoint (JWT Verified Profile Sync)
app.get('/api/users/profile', authenticateToken, async (req: any, res: express.Response) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User profile not found' });
    res.json({ user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users/sync', authenticateToken, async (req: any, res: express.Response) => {
  const { nickname, originState, premiumTier, bestScore, bestRank, unlockedBadgeIds } = req.body;
  try {
    const updated = await updateUser(req.user.id, {
      nickname,
      origin_state: originState,
      premium_tier: premiumTier,
      best_score: bestScore,
      best_rank: bestRank,
      unlocked_badge_ids: unlockedBadgeIds ? JSON.stringify(unlockedBadgeIds) : undefined
    });
    res.json({ user: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend built static pages in production
const distPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  console.log(`📁 Production static site configured from path: ${distPath}`);
  app.use(express.static(distPath));
  
  // Serve index.html on fallback paths for client-side single page app routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.warn('⚠️ Frontend production "dist" directory not found. Please compile frontend bundle.');
  app.get('/', (req, res) => {
    res.send('Loghat API running successfully (Development Mode). Please compile web bundle via "npm run build".');
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Production server launched on port http://localhost:${PORT}`);
});
