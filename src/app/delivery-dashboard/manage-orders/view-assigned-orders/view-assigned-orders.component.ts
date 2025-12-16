import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Assignment {
  assignmentId: number;
  orderId: number;
  status: string;
  assignedAt: string;
  deliveryAddress: string;
  specialInstructions: string;
}

interface ApiResponse {
  resultCode: number;
  resultDescription: string;
  data: {
    teamId: number;
    assignments: Assignment[];
  };
}

interface StatusChangeResponse {
  resultCode: number;
  resultDescription: string;
}

@Component({
  selector: 'app-view-assigned-orders',
  templateUrl: './view-assigned-orders.component.html',
  styleUrls: ['./view-assigned-orders.component.scss']
})
export class ViewAssignedOrdersComponent implements OnInit {
  assignments: Assignment[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadAssignedOrders();
  }

  loadAssignedOrders() {
    this.loading = true;
    this.error = '';

    const deliveryTeamId = this.getDeliveryTeamId();
    const url = `http://localhost:8186/pohoro-operations-service/operations/delivery/assigned-orders/${deliveryTeamId}`;

    this.http.get<ApiResponse>(url).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.resultCode === 0) {
          this.assignments = response.data.assignments || [];
        } else {
          this.error = response.resultDescription || 'Failed to load assigned orders';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load assigned orders. Please try again.';
      }
    });
  }

  updateOrderStatus(orderId: number, status: 'OUT_FOR_DELIVERY' | 'DELIVERED') {
    const url = `http://localhost:8183/pohoro-distributor-service/delivery/orders/${orderId}/change-status`;
    
    const payload = {
      status: status,
      notes: status === 'OUT_FOR_DELIVERY' ? 'Order out for delivery' : 'Package delivered successfully'
    };

    this.http.put<StatusChangeResponse>(url, payload).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          // Reload orders to get updated status
          this.loadAssignedOrders();
        } else {
          this.error = response.resultDescription || 'Failed to update order status';
        }
      },
      error: (err) => {
        this.error = 'Failed to update order status. Please try again.';
      }
    });
  }

  private getDeliveryTeamId(): string {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.entityId || '2';
      } catch (e) {
        return '2';
      }
    }
    return '2';
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'assigned': return 'status-assigned';
      case 'out_for_delivery': return 'status-out-for-delivery';
      case 'delivered': return 'status-delivered';
      default: return 'status-default';
    }
  }

  canMarkOutForDelivery(status: string): boolean {
    return status.toLowerCase() === 'assigned';
  }

  canMarkDelivered(status: string): boolean {
    return status.toLowerCase() === 'out_for_delivery';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  goBack() {
    this.router.navigate(['/delivery-dashboard/manage-orders']);
  }
}
