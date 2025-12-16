import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrderService } from '../../../shared/services/purchase-order.service';
import { NotificationService } from '../../../shared/services/notification.service';

interface WorkflowStep {
  status: 'COMPLETED' | 'PENDING';
  timestamp: string | null;
  description: string;
}

interface TrackingData {
  orderId: number;
  status: string;
  dealerId: number;
  workflowProgress: {
    orderPlaced: WorkflowStep;
    orderApproved: WorkflowStep;
    assignedToDelivery: WorkflowStep;
    outForDelivery: WorkflowStep;
    delivered: WorkflowStep;
    confirmed: WorkflowStep;
  };
  deliveryInfo: {
    driverName: string;
    driverPhone: string;
    estimatedDelivery: string;
  };
  orderDetails: {
    totalAmount: number;
    itemCount: number;
    deliveryAddress: string;
  };
}

@Component({
  selector: 'app-trace-order',
  templateUrl: './trace-order.component.html',
  styleUrls: ['./trace-order.component.scss']
})
export class TraceOrderComponent {
  searchOrderId: number | null = null;
  trackingData: TrackingData | null = null;
  isLoading = false;

  workflowSteps = [
    { key: 'orderPlaced', label: 'Order Placed', icon: 'shopping_cart' },
    { key: 'orderApproved', label: 'Order Approved', icon: 'check_circle' },
    { key: 'assignedToDelivery', label: 'Assigned to Delivery', icon: 'assignment_ind' },
    { key: 'outForDelivery', label: 'Out for Delivery', icon: 'local_shipping' },
    { key: 'delivered', label: 'Delivered', icon: 'done_all' },
    { key: 'confirmed', label: 'Confirmed', icon: 'verified' }
  ];

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  searchOrder() {
    if (!this.searchOrderId) {
      this.notificationService.showError('Please enter an order ID');
      return;
    }

    this.isLoading = true;
    this.trackingData = null;
    
    // Using distributorId = 1 for now (should come from auth service)
    this.purchaseOrderService.trackOrder(1, this.searchOrderId).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          this.trackingData = response.data;
        } else {
          this.notificationService.showError('Order not found');
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        this.notificationService.showError('Failed to track order');
        this.isLoading = false;
      }
    });
  }

  clearSearch() {
    this.searchOrderId = null;
    this.trackingData = null;
  }

  getStepStatus(stepKey: string): 'COMPLETED' | 'PENDING' {
    if (!this.trackingData) return 'PENDING';
    return (this.trackingData.workflowProgress as any)[stepKey]?.status || 'PENDING';
  }

  getStepTimestamp(stepKey: string): string | null {
    if (!this.trackingData) return null;
    return (this.trackingData.workflowProgress as any)[stepKey]?.timestamp || null;
  }

  getStepDescription(stepKey: string): string {
    if (!this.trackingData) return '';
    return (this.trackingData.workflowProgress as any)[stepKey]?.description || '';
  }

  goBack() {
    this.router.navigate(['/distributor-dashboard/manage-orders']);
  }
}
