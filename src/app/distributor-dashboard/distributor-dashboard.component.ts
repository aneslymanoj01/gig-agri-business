import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { JwtPayload } from '../shared/models/auth.models';

@Component({
  selector: 'app-distributor-dashboard',
  templateUrl: './distributor-dashboard.component.html',
  styleUrls: ['./distributor-dashboard.component.scss']
})
export class DistributorDashboardComponent implements OnInit {
  currentUser: JwtPayload | null = null;
  showUserMenu = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  navigateToChangePassword(): void {
    this.showUserMenu = false;
    this.router.navigate(['/distributor-dashboard/change-password']);
  }

  logout(): void {
    this.showUserMenu = false;
    this.authService.logout();
  }
}
