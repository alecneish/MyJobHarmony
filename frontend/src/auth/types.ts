export type UserRole = 'candidate' | 'recruiter';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface StoredUser extends AuthUser {
  passwordHash: string;
  createdAt: string;
}

export class AuthError extends Error {
  code:
    | 'INVALID_CREDENTIALS'
    | 'EMAIL_IN_USE'
    | 'INVALID_EMAIL'
    | 'WEAK_PASSWORD'
    | 'UNKNOWN';

  constructor(code: AuthError['code'], message: string) {
    super(message);
    this.code = code;
  }
}

