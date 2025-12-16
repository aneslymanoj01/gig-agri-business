import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface WorkflowStep {
  status: 'COMPLETED' | 'PENDING';
  timestamp: string | null;
  description: string;
}

interface TrackOrderResponse {
  resultCode: number;
  resultDescription: string;
  data: {
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
    } | null;
    orderDetails: {
      totalAmount: number;
      itemCount: number;
      deliveryAddress: string;
    };
  };
}

@Component({
  selector: 'app-track-orders',
  templateUrl: './track-orders.component.html',
  styleUrls: ['./track-orders.component.scss']
})
export class TrackOrdersComponent {
  orderId: string = '';
  trackingData: TrackOrderResponse['data'] | null = null;
  loading = false;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  searchOrder() {
    if (!this.orderId.trim()) {
      this.error = 'Please enter an order ID';
      return;
    }

    this.loading = true;
    this.error = '';
    this.trackingData = null;

    const dealerId = this.getDealerId();
    const url = `http://localhost:8186/pohoro-operations-service/operations/orders/${this.orderId}/track/${dealerId}`;

    this.http.get<TrackOrderResponse>(url).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.resultCode === 0) {
          this.trackingData = response.data;
        } else {
          this.error = response.resultDescription || 'Failed to fetch order details';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to track order. Please try again.';
      }
    });
  }

  private getDealerId(): string {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.entityId || '1';
      } catch (e) {
        return '1';
      }
    }
    return '1';
  }

  getWorkflowSteps() {
    if (!this.trackingData) return [];
    
    const progress = this.trackingData.workflowProgress;
    return [
      { key: 'orderPlaced', label: 'Order Placed', ...progress.orderPlaced },
      { key: 'orderApproved', label: 'Order Approved', ...progress.orderApproved },
      { key: 'assignedToDelivery', label: 'Assigned to Delivery', ...progress.assignedToDelivery },
      { key: 'outForDelivery', label: 'Out for Delivery', ...progress.outForDelivery },
      { key: 'delivered', label: 'Delivered', ...progress.delivered },
      { key: 'confirmed', label: 'Confirmed', ...progress.confirmed }
    ];
  }

  formatTimestamp(timestamp: string | null): string {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleString();
  }

  goBack() {
    this.router.navigate(['/dealer-dashboard/manage-orders']);
  }
}
