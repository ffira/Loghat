import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { 
  initializeDbSchema, 
  getUserById, 
  getUserByEmail, 
  getUserByAppleId, 
  getUserByGoogleId, 
  createUser, 
  updateUser, 
  logTransaction,
  getUserByReferralCode,
  getSocialFeed,
  createPost,
  toggleLike,
  addComment,
  getWalletBalance,
  addWalletTransaction,
  hasUserRedeemedReferral,
  saveVerificationCode,
  verifyVerificationCode,
  DBUser,
  DBPost,
  DBPostComment 
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

// Initialize SMTP Transporter for Email Verification
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

async function sendVerificationEmail(email: string, code: string): Promise<string | null> {
  let activeTransporter = transporter;
  let previewUrl = null;
  
  const isSmtpConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  if (!isSmtpConfigured) {
    console.log('⚠️ SMTP not configured. Generating Ethereal Mail test credentials...');
    try {
      const testAccount = await nodemailer.createTestAccount();
      activeTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (e: any) {
      console.error('✕ Failed to create Ethereal Mail account:', e.message);
      return null;
    }
  }

  const mailOptions = {
    from: '"Loghat preserving platform" <no-reply@loghatku.my>',
    to: email.toLowerCase(),
    subject: '🔑 Loghat Verification Passcode',
    text: `Hello! Your verification passcode is: ${code}. It will expire in 10 minutes.`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; padding: 25px; border-radius: 16px; background: #07090e; color: #ffffff;">
        <h2 style="color: #22d3ee; text-align: center; font-size: 24px; font-weight: 800; letter-spacing: 1px;">Loghat 🇲🇾</h2>
        <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">Hello there! You requested a verification passcode to link your email address.</p>
        <div style="background: #0f172a; border: 1px solid #334155; padding: 20px; text-align: center; border-radius: 12px; margin: 25px 0;">
          <span style="font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #22d3ee; font-family: monospace;">${code}</span>
        </div>
        <p style="font-size: 11px; color: #475569; text-align: center; line-height: 1.4; margin-top: 25px;">This passcode will expire in 10 minutes. If you did not request this code, you can ignore this email safely.</p>
      </div>
    `
  };

  const info = await activeTransporter.sendMail(mailOptions);
  console.log('📧 Verification email sent successfully to: %s', email);
  if (!isSmtpConfigured) {
    previewUrl = nodemailer.getTestMessageUrl(info);
    console.log('🔗 [Ethereal Mail Preview URL]: %s', previewUrl);
  }
  return previewUrl;
}

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

// Helper: JWT optional verification middleware for reading public resources
const optionalAuthenticate = (req: any, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = { id: 'usr-guest' };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      req.user = { id: 'usr-guest' };
    } else {
      req.user = user;
    }
    next();
  });
};

// 3. User Authentication Endpoints

// Email Verification Code Request
app.post('/api/auth/send-code', async (req: express.Request, res: express.Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address structure.' });
  }

  try {
    // Check if account already exists
    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    // Generate random 6 digit numeric code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await saveVerificationCode(email, code);

    // Send the email
    const previewUrl = await sendVerificationEmail(email, code);

    res.json({ 
      success: true, 
      message: 'Verification code sent to your email address!',
      previewUrl // non-null if using Ethereal mock
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Email/Password Registration
app.post('/api/auth/register', async (req: express.Request, res: express.Response) => {
  const { email, password, nickname, originState, code } = req.body;

  if (!email || !password || !nickname || !code) {
    return res.status(400).json({ error: 'Required fields: email, password, nickname, and verification code.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address structure.' });
  }

  try {
    // Verify one-time passcode
    const isVerified = await verifyVerificationCode(email, code);
    if (!isVerified) {
      return res.status(400).json({ error: 'Invalid or expired verification code!' });
    }

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
      email_verified: true, // Mark verified since code verification succeeded
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
  const { nickname, originState, premiumTier, bestScore, bestRank, unlockedBadgeIds, referralCode } = req.body;
  try {
    const updated = await updateUser(req.user.id, {
      nickname,
      origin_state: originState,
      premium_tier: premiumTier,
      best_score: bestScore,
      best_rank: bestRank,
      unlocked_badge_ids: unlockedBadgeIds ? JSON.stringify(unlockedBadgeIds) : undefined,
      referral_code: referralCode
    });
    res.json({ user: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Social Feed Endpoints

// Fetch public feed (guest/authenticated)
app.get('/api/social/feed', optionalAuthenticate, async (req: any, res) => {
  try {
    const feed = await getSocialFeed(req.user.id);
    res.json(feed);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create new post (authenticated)
app.post('/api/social/posts', authenticateToken, async (req: any, res) => {
  const { text, type, challengeDetails } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Post content (text) is required' });
  }
  try {
    const newPost: DBPost = {
      id: `post-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      user_id: req.user.id,
      post_type: type || 'general',
      content: text,
      challenge_details: challengeDetails ? JSON.stringify(challengeDetails) : null,
      created_at: new Date().toISOString()
    };
    await createPost(newPost);
    res.status(201).json(newPost);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle post like status (authenticated)
app.post('/api/social/posts/:id/like', authenticateToken, async (req: any, res) => {
  const postId = req.params.id;
  try {
    const liked = await toggleLike(req.user.id, postId);
    res.json({ liked });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Add comment to a post (authenticated)
app.post('/api/social/posts/:id/comments', authenticateToken, async (req: any, res) => {
  const postId = req.params.id;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Comment content (text) is required' });
  }
  try {
    const newComment: DBPostComment = {
      id: `c-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      post_id: postId,
      user_id: req.user.id,
      content: text,
      created_at: new Date().toISOString()
    };
    await addComment(newComment);
    res.status(201).json(newComment);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Wallet & Ledger Endpoints

// Fetch wallet balance (authenticated)
app.get('/api/wallet/balance', authenticateToken, async (req: any, res) => {
  try {
    const balance = await getWalletBalance(req.user.id);
    res.json({ balance });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Redeem friend's referral code (authenticated)
app.post('/api/wallet/redeem', authenticateToken, async (req: any, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Referral code is required' });
  }
  try {
    const cleanCode = code.trim().toUpperCase();
    const redeemer = await getUserById(req.user.id);
    if (!redeemer) {
      return res.status(404).json({ error: 'Redeemer account not found' });
    }

    if (redeemer.referral_code?.toUpperCase() === cleanCode) {
      return res.status(400).json({ error: 'Cannot redeem your own referral code!' });
    }

    const owner = await getUserByReferralCode(cleanCode);
    if (!owner) {
      return res.status(400).json({ error: 'Invalid referral code!' });
    }

    // Check if user has already redeemed a code
    const alreadyRedeemed = await hasUserRedeemedReferral(req.user.id);
    if (alreadyRedeemed) {
      return res.status(400).json({ error: 'You have already redeemed a referral code!' });
    }

    // Award both
    await addWalletTransaction(
      redeemer.id, 
      5.00, 
      'referral_redeem', 
      `Redeemed referral code ${cleanCode} from user ${owner.nickname}`
    );
    await addWalletTransaction(
      owner.id, 
      5.00, 
      'referral_reward', 
      `User ${redeemer.nickname} redeemed your referral code`
    );

    res.json({ success: true, message: 'Referral code successfully redeemed! RM5 credited.' });
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
