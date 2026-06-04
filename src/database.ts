import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Setup local DB file fallback paths
const DB_DIR = path.resolve(process.cwd(), '.db_local');
const USERS_FILE = path.join(DB_DIR, 'users.json');
const TRANSACTIONS_FILE = path.join(DB_DIR, 'transactions.json');

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

// Initialize PostgreSQL tables if active
export async function initializeDbSchema() {
  if (isPostgresActive && pgPool) {
    const client = await pgPool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE,
          password_hash TEXT,
          apple_id TEXT UNIQUE,
          google_id TEXT UNIQUE,
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
          unlocked_badge_ids TEXT DEFAULT '[]'
        );
      `);

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

export async function createUser(user: DBUser): Promise<DBUser> {
  if (isPostgresActive && pgPool) {
    await pgPool.query(
      `INSERT INTO users (
        id, email, password_hash, apple_id, google_id, nickname, 
        origin_state, heritage_state, premium_tier, best_score, 
        best_rank, balance, email_verified, phone_verified, 
        location_permission, unlocked_badge_ids
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [
        user.id,
        user.email ? user.email.toLowerCase() : null,
        user.password_hash,
        user.apple_id,
        user.google_id,
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
        user.unlocked_badge_ids
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
