import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { JwtPayload } from '../shared/models/auth.models';

@Component({
  selector: 'app-dealer-dashboard',
  templateUrl: './dealer-dashboard.component.html',
  styleUrls: ['./dealer-dashboard.component.scss']
})
export class DealerDashboardComponent implements OnInit {
  currentUser: JwtPayload | null = null;
  showUserMenu = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  changePassword() {
    this.showUserMenu = false;
    this.router.navigate(['/dealer-dashboard/change-password']);
  }

  logout() {
    this.showUserMenu = false;
    this.authService.logout();
  }
}
