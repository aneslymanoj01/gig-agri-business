import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { NotificationService } from '../shared/services/notification.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isSidenavOpen = true;
  currentUser: any;
  isLoggingOut = false;
  showUserMenu = false;

  menuItems: MenuItem[] = [
    {
      icon: 'people',
      label: 'Distributors',
      route: '/dashboard/distributors',
      description: 'Manage distributor network'
    },
    {
      icon: 'inventory_2',
      label: 'Products',
      route: '/dashboard/products',
      description: 'Product catalog management'
    },
    {
      icon: 'local_shipping',
      label: 'Delivery Team',
      route: '/dashboard/delivery-team',
      description: 'Delivery team management'
    },
    {
      icon: 'assignment',
      label: 'Stock Requests',
      route: '/dashboard/stock-requests',
      description: 'Review distributor requests'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  onLogout(): void {
    this.isLoggingOut = true;
    this.notificationService.showInfo('Logging out...');
    this.authService.logout();
  }

  navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }

  navigateToChangePassword(): void {
    this.showUserMenu = false;
    this.router.navigate(['/dashboard/change-password']);
  }

  isRouteActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
