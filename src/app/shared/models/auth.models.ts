export interface LoginRequest {
  userName: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  isPasswordChangeRequired: boolean;
}

export interface LoginResponse {
  errorCode: number;
  errorMessage?: string;
  errorDescription?: string;
  tokenResponse?: TokenResponse;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  errorCode: number;
  errorMessage?: string;
  errorDescription?: string;
}

export interface JwtPayload {
  sub: string;
  role: string;
  entityId: number;
  iat: number;
  exp: number;
}

export enum UserRole {
  MASTER = 'MASTER',
  DISTRIBUTOR = 'DISTRIBUTOR',
  DEALER = 'DEALER',
  DELIVERY = 'DELIVERY'
}
