import { AuthError, AuthUser, StoredUser, UserRole } from './types';

const USERS_KEY = 'jh-auth-users';
const SESSION_KEY = 'jh-auth-session-user-id';

function safeJsonParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function getStoredUsers(): StoredUser[] {
  return safeJsonParse<StoredUser[]>(localStorage.getItem(USERS_KEY), []);
}

function setStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSessionUserId(userId: string | null) {
  if (!userId) localStorage.removeItem(SESSION_KEY);
  else localStorage.setItem(SESSION_KEY, userId);
}

function getSessionUserId(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

async function sha256(text: string): Promise<string> {
  // Not for production; just avoids storing raw passwords in localStorage.
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function validateEmail(email: string) {
  const e = normalizeEmail(email);
  if (!e || !e.includes('@') || e.startsWith('@') || e.endsWith('@')) {
    throw new AuthError('INVALID_EMAIL', 'Enter a valid email address.');
  }
  return e;
}

function validatePassword(password: string) {
  if (!password || password.length < 6) {
    throw new AuthError('WEAK_PASSWORD', 'Password must be at least 6 characters.');
  }
}

export async function signUp(email: string, password: string, role: UserRole): Promise<AuthUser> {
  const normalized = validateEmail(email);
  validatePassword(password);

  const users = getStoredUsers();
  const exists = users.some((u) => normalizeEmail(u.email) === normalized);
  if (exists) {
    throw new AuthError('EMAIL_IN_USE', 'That email is already registered. Try logging in instead.');
  }

  const id = crypto.randomUUID();
  const passwordHash = await sha256(password);
  const createdAt = new Date().toISOString();
  const user: StoredUser = { id, email: normalized, role, passwordHash, createdAt };
  setStoredUsers([user, ...users]);
  setSessionUserId(id);
  return { id, email: user.email, role: user.role };
}

export async function signIn(email: string, password: string): Promise<AuthUser> {
  const normalized = validateEmail(email);
  validatePassword(password);

  const users = getStoredUsers();
  const user = users.find((u) => normalizeEmail(u.email) === normalized);
  if (!user) {
    throw new AuthError('INVALID_CREDENTIALS', 'Incorrect email or password.');
  }

  const passwordHash = await sha256(password);
  if (passwordHash !== user.passwordHash) {
    throw new AuthError('INVALID_CREDENTIALS', 'Incorrect email or password.');
  }

  setSessionUserId(user.id);
  return { id: user.id, email: user.email, role: user.role };
}

export function signOut() {
  setSessionUserId(null);
}

export function getCurrentUser(): AuthUser | null {
  const userId = getSessionUserId();
  if (!userId) return null;
  const users = getStoredUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) {
    setSessionUserId(null);
    return null;
  }
  return { id: user.id, email: user.email, role: user.role };
}

