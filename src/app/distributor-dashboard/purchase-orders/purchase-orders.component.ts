import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent {
  constructor(private router: Router) {}

  navigateToCreate() {
    this.router.navigate(['/distributor-dashboard/purchase-orders/create']);
  }

  navigateToView() {
    this.router.navigate(['/distributor-dashboard/purchase-orders/view']);
  }
}
