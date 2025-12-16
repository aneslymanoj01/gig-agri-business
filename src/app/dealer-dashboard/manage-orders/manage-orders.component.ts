import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent {
  
  constructor(private router: Router) {}

  navigateToNewOrder() {
    this.router.navigate(['/dealer-dashboard/manage-orders/new']);
  }

  navigateToViewOrders() {
    this.router.navigate(['/dealer-dashboard/manage-orders/view']);
  }

  navigateToTrackOrder() {
    this.router.navigate(['/dealer-dashboard/manage-orders/track']);
  }
}
