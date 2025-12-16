import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrderService, Order } from '../../../shared/services/purchase-order.service';
import { DeliveryTeamService } from '../../../shared/services/delivery-team.service';
import { NotificationService } from '../../../shared/services/notification.service';

interface DeliveryTeam {
  id: number;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  licenseNumber: string;
  vehicleNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-assign-delivery',
  templateUrl: './assign-delivery.component.html',
  styleUrls: ['./assign-delivery.component.scss']
})
export class AssignDeliveryComponent {
  // Order search
  searchOrderId: number | null = null;
  order: Order | null = null;
  isLoadingOrder = false;

  // Delivery team search
  deliveryTeams: DeliveryTeam[] = [];
  selectedTeam: DeliveryTeam | null = null;
  isLoadingTeams = false;
  teamSearchName = '';
  teamSearchPhone = '';

  // Assignment
  expectedDeliveryDate = '';
  specialInstructions = '';
  isAssigning = false;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private deliveryTeamService: DeliveryTeamService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  searchOrder() {
    if (!this.searchOrderId) {
      this.notificationService.showError('Please enter an order ID');
      return;
    }

    this.isLoadingOrder = true;
    this.order = null;
    this.selectedTeam = null;
    
    this.purchaseOrderService.getOrderById(this.searchOrderId).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          this.order = response.data;
          if (this.order?.status === 'APPROVED') {
            this.loadDeliveryTeams();
          }
        } else {
          this.notificationService.showError('Order not found');
        }
        this.isLoadingOrder = false;
      },
      error: (error: any) => {
        this.notificationService.showError('Failed to fetch order');
        this.isLoadingOrder = false;
      }
    });
  }

  clearOrderSearch() {
    this.searchOrderId = null;
    this.order = null;
    this.selectedTeam = null;
    this.deliveryTeams = [];
  }

  loadDeliveryTeams() {
    this.isLoadingTeams = true;
    this.deliveryTeamService.searchDeliveryTeam({
      name: this.teamSearchName,
      phone: this.teamSearchPhone
    }).subscribe({
      next: (response: any) => {
        if (response.resultCode === 0) {
          // Don't filter by status since it can be null, just show all teams
          this.deliveryTeams = response.data.content;
        }
        this.isLoadingTeams = false;
      },
      error: (error: any) => {
        this.notificationService.showError('Failed to load delivery teams');
        this.isLoadingTeams = false;
      }
    });
  }

  searchDeliveryTeams() {
    this.loadDeliveryTeams();
  }

  clearTeamSearch() {
    this.teamSearchName = '';
    this.teamSearchPhone = '';
    this.loadDeliveryTeams();
  }

  selectTeam(team: DeliveryTeam) {
    this.selectedTeam = team;
  }

  assignDelivery() {
    if (!this.order || !this.selectedTeam || !this.expectedDeliveryDate) {
      this.notificationService.showError('Please select a delivery team and set expected delivery date');
      return;
    }

    this.isAssigning = true;
    // Convert date to ISO format for API
    const deliveryDate = new Date(this.expectedDeliveryDate).toISOString();
    
    const request = {
      deliveryTeamId: this.selectedTeam.id,
      expectedDeliveryDate: deliveryDate,
      specialInstructions: this.specialInstructions || undefined
    };

    this.purchaseOrderService.assignDelivery(this.order.orderId, request).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          this.notificationService.showSuccess('Delivery assigned successfully!');
          this.order!.status = 'ASSIGNED';
          this.clearForm();
        } else {
          this.notificationService.showError(response.resultDescription || 'Failed to assign delivery');
        }
        this.isAssigning = false;
      },
      error: (error: any) => {
        this.notificationService.showError('Failed to assign delivery');
        this.isAssigning = false;
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'APPROVED': return '#4CAF50';
      case 'ASSIGNED': return '#2196F3';
      default: return '#757575';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'APPROVED': return 'check_circle';
      case 'ASSIGNED': return 'assignment_ind';
      default: return 'help';
    }
  }

  goBack() {
    this.router.navigate(['/distributor-dashboard/manage-orders']);
  }

  getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  clearForm() {
    this.searchOrderId = null;
    this.order = null;
    this.selectedTeam = null;
    this.deliveryTeams = [];
    this.expectedDeliveryDate = '';
    this.specialInstructions = '';
    this.teamSearchName = '';
    this.teamSearchPhone = '';
  }
}
