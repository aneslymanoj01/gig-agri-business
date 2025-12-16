import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, ChangePasswordRequest, ChangePasswordResponse, JwtPayload, UserRole } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_BASE = 'http://localhost:8180/pohoro-auth-service/auth';
  private readonly ACCESS_TOKEN_KEY = 'authToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_BASE}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.errorCode === 0 && response.tokenResponse?.accessToken) {
            // Validate role first before setting tokens
            const payload = this.decodeToken(response.tokenResponse.accessToken);
            if (payload?.role !== UserRole.MASTER && payload?.role !== UserRole.DISTRIBUTOR && payload?.role !== UserRole.DEALER && payload?.role !== UserRole.DELIVERY) {
              throw new Error('Access denied. Invalid role.');
            }
            
            // Only set tokens if role is valid
            this.setTokens(response.tokenResponse.accessToken, response.tokenResponse.refreshToken);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  changePassword(request: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this.http.post<ChangePasswordResponse>(`${this.API_BASE}/change-password`, request);
  }

  logout(): void {
    const token = this.getAccessToken();
    if (token) {
      // Call logout API
      this.http.post(`${this.API_BASE}/logout`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).subscribe({
        next: (response: any) => {
          if (response?.errorCode === 0 || !response) {
            this.clearSession();
          } else {
            // Even if API fails, clear local session
            this.clearSession();
          }
        },
        error: () => {
          // Even if API fails, clear local session
          this.clearSession();
        }
      });
    } else {
      this.clearSession();
    }
  }

  private clearSession(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  decodeToken(token?: string): JwtPayload | null {
    try {
      const tokenToUse = token || this.getAccessToken();
      if (!tokenToUse) return null;
      
      const payload = tokenToUse.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      return null;
    }
  }

  isTokenExpired(token?: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }

  hasValidToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    
    const payload = this.decodeToken(token);
    return (payload?.role === UserRole.MASTER || payload?.role === UserRole.DISTRIBUTOR || payload?.role === UserRole.DEALER || payload?.role === UserRole.DELIVERY) && !this.isTokenExpired(token);
  }

  getCurrentUser(): JwtPayload | null {
    return this.decodeToken();
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }
}
