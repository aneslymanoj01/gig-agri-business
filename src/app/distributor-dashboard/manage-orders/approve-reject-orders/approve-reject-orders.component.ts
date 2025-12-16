import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrderService, Order } from '../../../shared/services/purchase-order.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-approve-reject-orders',
  templateUrl: './approve-reject-orders.component.html',
  styleUrls: ['./approve-reject-orders.component.scss']
})
export class ApproveRejectOrdersComponent {
  searchOrderId: number | null = null;
  order: Order | null = null;
  isLoading = false;
  isProcessing = false;
  rejectReason = '';
  showRejectDialog = false;

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
    this.order = null;
    
    this.purchaseOrderService.getOrderById(this.searchOrderId).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          this.order = response.data;
        } else {
          this.notificationService.showError('Order not found');
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        this.notificationService.showError('Failed to fetch order');
        this.isLoading = false;
      }
    });
  }

  clearSearch() {
    this.searchOrderId = null;
    this.order = null;
  }

  approveOrder() {
    if (!this.order) return;

    this.isProcessing = true;
    this.purchaseOrderService.approveOrder(this.order.orderId).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          this.notificationService.showSuccess('Order approved successfully!');
          this.order!.status = 'APPROVED';
        } else {
          this.notificationService.showError(response.resultDescription || 'Failed to approve order');
        }
        this.isProcessing = false;
      },
      error: (error: any) => {
        this.notificationService.showError('Failed to approve order');
        this.isProcessing = false;
      }
    });
  }

  openRejectDialog() {
    this.showRejectDialog = true;
    this.rejectReason = '';
  }

  closeRejectDialog() {
    this.showRejectDialog = false;
    this.rejectReason = '';
  }

  rejectOrder() {
    if (!this.order || !this.rejectReason.trim()) {
      this.notificationService.showError('Please provide a rejection reason');
      return;
    }

    this.isProcessing = true;
    this.purchaseOrderService.rejectOrder(this.order.orderId, this.rejectReason).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          this.notificationService.showSuccess('Order rejected successfully!');
          this.order!.status = 'REJECTED';
          this.closeRejectDialog();
        } else {
          this.notificationService.showError(response.resultDescription || 'Failed to reject order');
        }
        this.isProcessing = false;
      },
      error: (error: any) => {
        this.notificationService.showError('Failed to reject order');
        this.isProcessing = false;
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING': return '#FF9800';
      case 'APPROVED': return '#4CAF50';
      case 'REJECTED': return '#F44336';
      default: return '#757575';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'PENDING': return 'schedule';
      case 'APPROVED': return 'check_circle';
      case 'REJECTED': return 'cancel';
      default: return 'help';
    }
  }

  goBack() {
    this.router.navigate(['/distributor-dashboard/manage-orders']);
  }
}
