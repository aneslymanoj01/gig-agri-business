import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrderService, Order } from '../../../shared/services/purchase-order.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading = false;
  
  // Filter options
  selectedStatus = '';
  dealerId: number | null = null;
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  
  statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'ASSIGNED', label: 'Assigned' },
    { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'CANCELLED', label: 'Cancelled' }
  ];

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    this.purchaseOrderService.getOrders(
      this.selectedStatus || undefined,
      this.dealerId || undefined,
      this.currentPage,
      this.pageSize
    ).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          this.orders = response.data.orders;
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading orders:', error);
        this.isLoading = false;
      }
    });
  }

  onFilterChange() {
    this.currentPage = 0;
    this.loadOrders();
  }

  onSearch() {
    this.currentPage = 0;
    this.loadOrders();
  }

  clearFilters() {
    this.selectedStatus = '';
    this.dealerId = null;
    this.currentPage = 0;
    this.loadOrders();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING': return '#FF9800';
      case 'APPROVED': return '#4CAF50';
      case 'ASSIGNED': return '#2196F3';
      case 'OUT_FOR_DELIVERY': return '#9C27B0';
      case 'DELIVERED': return '#00BCD4';
      case 'CONFIRMED': return '#4CAF50';
      case 'CANCELLED': return '#F44336';
      default: return '#757575';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'PENDING': return 'schedule';
      case 'APPROVED': return 'check_circle';
      case 'ASSIGNED': return 'assignment_ind';
      case 'OUT_FOR_DELIVERY': return 'local_shipping';
      case 'DELIVERED': return 'done_all';
      case 'CONFIRMED': return 'verified';
      case 'CANCELLED': return 'cancel';
      default: return 'help';
    }
  }

  goBack() {
    this.router.navigate(['/distributor-dashboard/manage-orders']);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadOrders();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadOrders();
    }
  }
}
