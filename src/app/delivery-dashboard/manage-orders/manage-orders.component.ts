import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent {
  
  constructor(private router: Router) {}

  navigateToViewAssignedOrders() {
    this.router.navigate(['/delivery-dashboard/manage-orders/view-assigned']);
  }
}
