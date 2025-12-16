import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent {
  constructor(private router: Router) {}

  navigateToViewOrders() {
    this.router.navigate(['/distributor-dashboard/manage-orders/view']);
  }

  navigateToAssignDelivery() {
    this.router.navigate(['/distributor-dashboard/manage-orders/assign-delivery']);
  }

  navigateToApproveReject() {
    this.router.navigate(['/distributor-dashboard/manage-orders/approve-reject']);
  }

  navigateToTraceOrder() {
    this.router.navigate(['/distributor-dashboard/manage-orders/trace']);
  }
}
