import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { UserRole } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(): boolean {
    if (this.authService.hasValidToken()) {
      const user = this.authService.getCurrentUser();
      if (user?.role === UserRole.MASTER || user?.role === UserRole.DISTRIBUTOR || user?.role === UserRole.DEALER || user?.role === UserRole.DELIVERY) {
        return true;
      }
    }
    
    this.notificationService.showError('Access denied. Please login with valid credentials.');
    this.router.navigate(['/login']);
    return false;
  }
}
