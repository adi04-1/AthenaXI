export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: UserRole;
  userId: string;
  teamName: string | null;
  expiresAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  teamName: string | null;
  isImpersonating: boolean;
  impersonatedBy: string | null;
  createdAt: string;
}

export type UserRole = 'AppOwner' | 'LeagueAdmin' | 'TeamOwner' | 'Guest';
