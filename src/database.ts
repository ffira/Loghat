import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Setup local DB file fallback paths
const DB_DIR = path.resolve(process.cwd(), '.db_local');
const USERS_FILE = path.join(DB_DIR, 'users.json');
const TRANSACTIONS_FILE = path.join(DB_DIR, 'transactions.json');
const POSTS_FILE = path.join(DB_DIR, 'posts.json');
const POST_LIKES_FILE = path.join(DB_DIR, 'post_likes.json');
const POST_COMMENTS_FILE = path.join(DB_DIR, 'post_comments.json');
const WALLET_LEDGER_FILE = path.join(DB_DIR, 'wallet_ledger.json');
const VERIFICATION_CODES_FILE = path.join(DB_DIR, 'verification_codes.json');

// Ensure local directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(TRANSACTIONS_FILE)) {
  fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(POSTS_FILE)) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(POST_LIKES_FILE)) {
  fs.writeFileSync(POST_LIKES_FILE, JSON.stringify([]));
}
if (!fs.existsSync(POST_COMMENTS_FILE)) {
  fs.writeFileSync(POST_COMMENTS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(WALLET_LEDGER_FILE)) {
  fs.writeFileSync(WALLET_LEDGER_FILE, JSON.stringify([]));
}
if (!fs.existsSync(VERIFICATION_CODES_FILE)) {
  fs.writeFileSync(VERIFICATION_CODES_FILE, JSON.stringify([]));
}

// Encryption utility helper keys (simulated transit/rest keys)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'a3f9e801b7c52d4e6a0d2f4e8b0c4a1b'; // 32 characters
const IV_LENGTH = 16;

export function encrypt(text: string): string {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  } catch (e) {
    return text; // Fallback
  }
}

export function decrypt(text: string): string {
  try {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift() || '', 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (e) {
    return text;
  }
}

// Initialize Database connection Pool
const isPostgresActive = !!process.env.DATABASE_URL;
let pgPool: Pool | null = null;

if (isPostgresActive) {
  console.log('⚡ Connected to Production PostgreSQL Cluster');
  pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
} else {
  console.log('📂 PostgreSQL URL not specified. Initializing Resilient JSON File-system Database.');
}

// Interfaces
export interface DBUser {
  id: string;
  email: string | null;
  password_hash: string | null;
  apple_id: string | null;
  google_id: string | null;
  phone: string | null;
  nickname: string;
  origin_state: string;
  heritage_state: string;
  premium_tier: string; // 'none' | 'adfree' | 'ultra'
  best_score: number;
  best_rank: string;
  balance: number; // e.g. RM5 referral credits
  email_verified: boolean;
  phone_verified: boolean;
  location_permission: string;
  unlocked_badge_ids: string; // JSON Array String
  referral_code?: string | null;
}

export interface DBTransaction {
  id: string;
  user_id: string;
  session_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

export interface DBPost {
  id: string;
  user_id: string;
  post_type: string; // 'general' | 'challenge' | 'slang_share'
  content: string;
  challenge_details: string | null; // JSON String
  created_at: string;
}

export interface DBPostLike {
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface DBPostComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface DBWalletLedger {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: string; // 'referral_bonus' | 'redeem_code' | 'premium_unlock'
  description: string;
  created_at: string;
}

// Initialize PostgreSQL tables if active
export async function initializeDbSchema() {
  if (isPostgresActive && pgPool) {
    const client = await pgPool.connect();
    try {
      // 1. Create/Alter users table
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE,
          password_hash TEXT,
          apple_id TEXT UNIQUE,
          google_id TEXT UNIQUE,
          phone TEXT,
          nickname TEXT,
          origin_state TEXT,
          heritage_state TEXT,
          premium_tier TEXT DEFAULT 'none',
          best_score INTEGER DEFAULT 0,
          best_rank TEXT,
          balance NUMERIC DEFAULT 0,
          email_verified BOOLEAN DEFAULT FALSE,
          phone_verified BOOLEAN DEFAULT FALSE,
          location_permission TEXT DEFAULT 'denied',
          unlocked_badge_ids TEXT DEFAULT '[]',
          referral_code TEXT UNIQUE
        );
      `);

      // Migration: Add referral_code column if missing in existing database
      try {
        await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;`);
      } catch (e) {}

      try {
        await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;`);
      } catch (e) {}

      // 2. Transactions table
      await client.query(`
        CREATE TABLE IF NOT EXISTS transactions (
          id TEXT PRIMARY KEY,
          user_id TEXT,
          session_id TEXT,
          amount NUMERIC,
          currency TEXT,
          status TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // 3. Posts table
      await client.query(`
        CREATE TABLE IF NOT EXISTS posts (
          id TEXT PRIMARY KEY,
          user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
          post_type TEXT DEFAULT 'general',
          content TEXT NOT NULL,
          challenge_details TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // 4. Post Likes
      await client.query(`
        CREATE TABLE IF NOT EXISTS post_likes (
          user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
          post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (user_id, post_id)
        );
      `);

      // 5. Post Comments
      await client.query(`
        CREATE TABLE IF NOT EXISTS post_comments (
          id TEXT PRIMARY KEY,
          post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
          user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // 6. Wallet Ledger
      await client.query(`
        CREATE TABLE IF NOT EXISTS wallet_ledger (
          id TEXT PRIMARY KEY,
          user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
          amount NUMERIC NOT NULL,
          transaction_type TEXT NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // 7. Verification Codes
      await client.query(`
        CREATE TABLE IF NOT EXISTS verification_codes (
          email TEXT PRIMARY KEY,
          code TEXT NOT NULL,
          expires_at TIMESTAMP NOT NULL
        );
      `);

      console.log('✨ PostgreSQL tables initialized successfully.');
    } catch (err) {
      console.error('✕ Failed to initialize database tables:', err);
    } finally {
      client.release();
    }
  }
}

// --- USER OPERATIONS ---

export async function getUserById(id: string): Promise<DBUser | null> {
  if (isPostgresActive && pgPool) {
    const res = await pgPool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0] || null;
  } else {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as DBUser[];
    return users.find(u => u.id === id) || null;
  }
}

export async function getUserByEmail(email: string): Promise<DBUser | null> {
  if (isPostgresActive && pgPool) {
    const res = await pgPool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    return res.rows[0] || null;
  } else {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as DBUser[];
    return users.find(u => u.email?.toLowerCase() === email.toLowerCase()) || null;
  }
}

export async function getUserByAppleId(appleId: string): Promise<DBUser | null> {
  if (isPostgresActive && pgPool) {
    const res = await pgPool.query('SELECT * FROM users WHERE apple_id = $1', [appleId]);
    return res.rows[0] || null;
  } else {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as DBUser[];
    return users.find(u => u.apple_id === appleId) || null;
  }
}

export async function getUserByGoogleId(googleId: string): Promise<DBUser | null> {
  if (isPostgresActive && pgPool) {
    const res = await pgPool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
    return res.rows[0] || null;
  } else {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as DBUser[];
    return users.find(u => u.google_id === googleId) || null;
  }
}

export async function getUserByReferralCode(code: string): Promise<DBUser | null> {
  if (isPostgresActive && pgPool) {
    const res = await pgPool.query('SELECT * FROM users WHERE UPPER(referral_code) = $1', [code.toUpperCase()]);
    return res.rows[0] || null;
  } else {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as DBUser[];
    return users.find(u => u.referral_code?.toUpperCase() === code.toUpperCase()) || null;
  }
}

export async function createUser(user: DBUser): Promise<DBUser> {
  // Generate a code if not provided
  if (!user.referral_code) {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    user.referral_code = `LGT-WAU-${randNum}`;
  }

  if (isPostgresActive && pgPool) {
    await pgPool.query(
      `INSERT INTO users (
        id, email, password_hash, apple_id, google_id, phone, nickname, 
        origin_state, heritage_state, premium_tier, best_score, 
        best_rank, balance, email_verified, phone_verified, 
        location_permission, unlocked_badge_ids, referral_code
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
      [
        user.id,
        user.email ? user.email.toLowerCase() : null,
        user.password_hash,
        user.apple_id,
        user.google_id,
        user.phone,
        user.nickname,
        user.origin_state,
        user.heritage_state,
        user.premium_tier,
        user.best_score,
        user.best_rank,
        user.balance,
        user.email_verified,
        user.phone_verified,
        user.location_permission,
        user.unlocked_badge_ids,
        user.referral_code
      ]
    );
    return user;
  } else {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as DBUser[];
    users.push(user);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return user;
  }
}

export async function updateUser(id: string, fields: Partial<DBUser>): Promise<DBUser | null> {
  if (isPostgresActive && pgPool) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return getUserById(id);
    
    const setQuery = keys.map((k, idx) => `${k} = $${idx + 2}`).join(', ');
    const values = keys.map(k => (fields as any)[k]);
    
    const res = await pgPool.query(
      `UPDATE users SET ${setQuery} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return res.rows[0] || null;
  } else {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as DBUser[];
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    
    users[idx] = { ...users[idx], ...fields };
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return users[idx];
  }
}

// --- TRANSACTION OPERATIONS ---

export async function logTransaction(tx: DBTransaction): Promise<DBTransaction> {
  if (isPostgresActive && pgPool) {
    await pgPool.query(
      `INSERT INTO transactions (id, user_id, session_id, amount, currency, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [tx.id, tx.user_id, tx.session_id, tx.amount, tx.currency, tx.status]
    );
    return tx;
  } else {
    const txs = JSON.parse(fs.readFileSync(TRANSACTIONS_FILE, 'utf-8')) as DBTransaction[];
    txs.push(tx);
    fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(txs, null, 2));
    return tx;
  }
}

// --- SOCIAL OPERATIONS ---

export async function getSocialFeed(currentUserId: string): Promise<any[]> {
  if (isPostgresActive && pgPool) {
    // Read feed from Postgres
    const feedQuery = `
      SELECT 
        p.id,
        p.content as text,
        p.post_type as type,
        p.challenge_details,
        p.created_at,
        u.nickname as author,
        u.premium_tier,
        u.best_rank as rank,
        u.unlocked_badge_ids,
        (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as likes,
        EXISTS(SELECT 1 FROM post_likes WHERE post_id = p.id AND user_id = $1) as is_liked_by_user
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 50
    `;
    const feedRes = await pgPool.query(feedQuery, [currentUserId]);
    
    // Fetch comments for these posts
    const postsList = feedRes.rows;
    for (const post of postsList) {
      const commentsQuery = `
        SELECT 
          c.id,
          c.content as text,
          c.created_at,
          u.nickname as author,
          u.premium_tier,
          u.origin_state
        FROM post_comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.post_id = $1
        ORDER BY c.created_at ASC
      `;
      const commentsRes = await pgPool.query(commentsQuery, [post.id]);
      post.comments = commentsRes.rows.map(c => ({
        id: c.id,
        author: c.author,
        avatar: c.origin_state === 'Malay' || c.premium_tier === 'ultra' ? '👑' : '🥤',
        text: c.text,
        timestamp: 'Just now', // standard visual mapping
        isUltra: c.premium_tier === 'ultra'
      }));

      // Parse challenge details if exists
      if (post.challenge_details) {
        try {
          post.challengeDetails = JSON.parse(post.challenge_details);
        } catch (e) {
          post.challengeDetails = null;
        }
      }
      
      // Standardize metadata
      post.avatar = post.premium_tier === 'ultra' ? '👑' : '🇲🇾';
      post.isLikedByUser = post.is_liked_by_user;
      post.isUltra = post.premium_tier === 'ultra';
      post.timestamp = 'Just now';
      post.badge = post.premium_tier === 'ultra' ? '👑 Ultra Premium' : undefined;
    }
    return postsList;
  } else {
    // Local JSON implementation
    const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8')) as DBPost[];
    const likes = JSON.parse(fs.readFileSync(POST_LIKES_FILE, 'utf-8')) as DBPostLike[];
    const comments = JSON.parse(fs.readFileSync(POST_COMMENTS_FILE, 'utf-8')) as DBPostComment[];
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as DBUser[];

    const result = posts.map(post => {
      const author = users.find(u => u.id === post.user_id) || { nickname: 'Guest', premium_tier: 'none', best_rank: 'Tourist', origin_state: 'Penang', unlocked_badge_ids: '[]' };
      const postLikes = likes.filter(l => l.post_id === post.id);
      const isLikedByUser = likes.some(l => l.post_id === post.id && l.user_id === currentUserId);
      
      const postComments = comments
        .filter(c => c.post_id === post.id)
        .map(c => {
          const cAuthor = users.find(u => u.id === c.user_id) || { nickname: 'Guest', premium_tier: 'none', origin_state: 'Penang' };
          return {
            id: c.id,
            author: cAuthor.nickname,
            avatar: cAuthor.premium_tier === 'ultra' ? '👑' : '🥤',
            text: c.content,
            timestamp: 'Just now',
            isUltra: cAuthor.premium_tier === 'ultra'
          };
        });

      let challengeDetails = null;
      if (post.challenge_details) {
        try {
          challengeDetails = JSON.parse(post.challenge_details);
        } catch (e) {}
      }

      return {
        id: post.id,
        author: author.nickname,
        avatar: author.premium_tier === 'ultra' ? '👑' : '🇲🇾',
        rank: author.best_rank,
        badge: author.premium_tier === 'ultra' ? '👑 Ultra Premium' : undefined,
        text: post.content,
        likes: postLikes.length,
        isLikedByUser,
        type: post.post_type,
        challengeDetails,
        comments: postComments,
        timestamp: 'Just now',
        isUltra: author.premium_tier === 'ultra'
      };
    });

    // Sort by id / date desc
    return result.reverse();
  }
}

export async function createPost(post: DBPost): Promise<DBPost> {
  if (isPostgresActive && pgPool) {
    await pgPool.query(
      `INSERT INTO posts (id, user_id, post_type, content, challenge_details)
       VALUES ($1, $2, $3, $4, $5)`,
      [post.id, post.user_id, post.post_type, post.content, post.challenge_details]
    );
    return post;
  } else {
    const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8')) as DBPost[];
    posts.push(post);
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
    return post;
  }
}

export async function toggleLike(userId: string, postId: string): Promise<boolean> {
  if (isPostgresActive && pgPool) {
    // Check if like exists
    const check = await pgPool.query(
      'SELECT 1 FROM post_likes WHERE user_id = $1 AND post_id = $2',
      [userId, postId]
    );
    if (check.rows.length > 0) {
      // Remove
      await pgPool.query(
        'DELETE FROM post_likes WHERE user_id = $1 AND post_id = $2',
        [userId, postId]
      );
      return false;
    } else {
      // Add
      await pgPool.query(
        'INSERT INTO post_likes (user_id, post_id) VALUES ($1, $2)',
        [userId, postId]
      );
      return true;
    }
  } else {
    const likes = JSON.parse(fs.readFileSync(POST_LIKES_FILE, 'utf-8')) as DBPostLike[];
    const idx = likes.findIndex(l => l.user_id === userId && l.post_id === postId);
    if (idx !== -1) {
      likes.splice(idx, 1);
      fs.writeFileSync(POST_LIKES_FILE, JSON.stringify(likes, null, 2));
      return false;
    } else {
      likes.push({ user_id: userId, post_id: postId, created_at: new Date().toISOString() });
      fs.writeFileSync(POST_LIKES_FILE, JSON.stringify(likes, null, 2));
      return true;
    }
  }
}

export async function addComment(comment: DBPostComment): Promise<DBPostComment> {
  if (isPostgresActive && pgPool) {
    await pgPool.query(
      `INSERT INTO post_comments (id, post_id, user_id, content)
       VALUES ($1, $2, $3, $4)`,
      [comment.id, comment.post_id, comment.user_id, comment.content]
    );
    return comment;
  } else {
    const comments = JSON.parse(fs.readFileSync(POST_COMMENTS_FILE, 'utf-8')) as DBPostComment[];
    comments.push(comment);
    fs.writeFileSync(POST_COMMENTS_FILE, JSON.stringify(comments, null, 2));
    return comment;
  }
}

// --- WALLET LEDGER OPERATIONS ---

export async function getWalletBalance(userId: string): Promise<number> {
  if (isPostgresActive && pgPool) {
    const res = await pgPool.query(
      'SELECT COALESCE(SUM(amount), 0) as balance FROM wallet_ledger WHERE user_id = $1',
      [userId]
    );
    return parseFloat(res.rows[0].balance || '0');
  } else {
    const ledger = JSON.parse(fs.readFileSync(WALLET_LEDGER_FILE, 'utf-8')) as DBWalletLedger[];
    const userLedger = ledger.filter(l => l.user_id === userId);
    return userLedger.reduce((acc, curr) => acc + curr.amount, 0);
  }
}

export async function addWalletTransaction(
  userId: string, 
  amount: number, 
  type: string, 
  description: string
): Promise<DBWalletLedger> {
  const tx: DBWalletLedger = {
    id: `wtx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    user_id: userId,
    amount,
    transaction_type: type,
    description,
    created_at: new Date().toISOString()
  };

  if (isPostgresActive && pgPool) {
    await pgPool.query(
      `INSERT INTO wallet_ledger (id, user_id, amount, transaction_type, description)
       VALUES ($1, $2, $3, $4, $5)`,
      [tx.id, tx.user_id, tx.amount, tx.transaction_type, tx.description]
    );
    
    // Also sync the users balance column
    const currentBalance = await getWalletBalance(userId);
    await pgPool.query('UPDATE users SET balance = $1 WHERE id = $2', [currentBalance, userId]);

    return tx;
  } else {
    const ledger = JSON.parse(fs.readFileSync(WALLET_LEDGER_FILE, 'utf-8')) as DBWalletLedger[];
    ledger.push(tx);
    fs.writeFileSync(WALLET_LEDGER_FILE, JSON.stringify(ledger, null, 2));

    // Update the local users.json file balance as well
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as DBUser[];
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      const balance = users[idx].balance || 0;
      users[idx].balance = balance + amount;
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    }

    return tx;
  }
}

export async function hasUserRedeemedReferral(userId: string): Promise<boolean> {
  if (isPostgresActive && pgPool) {
    const res = await pgPool.query(
      "SELECT 1 FROM wallet_ledger WHERE user_id = $1 AND transaction_type = 'referral_redeem'",
      [userId]
    );
    return res.rows.length > 0;
  } else {
    const ledger = JSON.parse(fs.readFileSync(WALLET_LEDGER_FILE, 'utf-8')) as DBWalletLedger[];
    return ledger.some(l => l.user_id === userId && l.transaction_type === 'referral_redeem');
  }
}

export interface DBVerificationCode {
  email: string;
  code: string;
  expires_at: string;
}

export async function saveVerificationCode(email: string, code: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 mins expiration

  if (isPostgresActive && pgPool) {
    await pgPool.query(
      `INSERT INTO verification_codes (email, code, expires_at)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET code = EXCLUDED.code, expires_at = EXCLUDED.expires_at`,
      [email.toLowerCase(), code, expiresAt]
    );
  } else {
    const codes = JSON.parse(fs.readFileSync(VERIFICATION_CODES_FILE, 'utf-8')) as DBVerificationCode[];
    const idx = codes.findIndex(c => c.email.toLowerCase() === email.toLowerCase());
    if (idx !== -1) {
      codes[idx] = { email: email.toLowerCase(), code, expires_at: expiresAt };
    } else {
      codes.push({ email: email.toLowerCase(), code, expires_at: expiresAt });
    }
    fs.writeFileSync(VERIFICATION_CODES_FILE, JSON.stringify(codes, null, 2));
  }
}

export async function verifyVerificationCode(email: string, code: string): Promise<boolean> {
  const now = new Date().toISOString();

  if (isPostgresActive && pgPool) {
    const res = await pgPool.query(
      'SELECT * FROM verification_codes WHERE email = $1 AND code = $2 AND expires_at > $3',
      [email.toLowerCase(), code, now]
    );
    if (res.rows.length > 0) {
      // Code is valid, delete it so it can't be reused
      await pgPool.query('DELETE FROM verification_codes WHERE email = $1', [email.toLowerCase()]);
      return true;
    }
    return false;
  } else {
    const codes = JSON.parse(fs.readFileSync(VERIFICATION_CODES_FILE, 'utf-8')) as DBVerificationCode[];
    const idx = codes.findIndex(c => c.email.toLowerCase() === email.toLowerCase() && c.code === code && c.expires_at > now);
    if (idx !== -1) {
      codes.splice(idx, 1);
      fs.writeFileSync(VERIFICATION_CODES_FILE, JSON.stringify(codes, null, 2));
      return true;
    }
    return false;
  }
}


