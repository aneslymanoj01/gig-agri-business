import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrderService } from '../../../shared/services/purchase-order.service';

interface StockRequestBatch {
  id: string;
  distributorId: number;
  priority: string;
  notes?: string;
  items: {
    productId: number;
    productName: string;
    quantity: number;
  }[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
  processedAt?: string;
  processedBy?: string;
  rejectionReason?: string;
}

@Component({
  selector: 'app-view-purchase-orders',
  templateUrl: './view-purchase-orders.component.html',
  styleUrls: ['./view-purchase-orders.component.scss']
})
export class ViewPurchaseOrdersComponent implements OnInit {
  stockRequests: StockRequestBatch[] = [];
  filteredRequests: StockRequestBatch[] = [];
  isLoading = false;
  
  // Filter options
  selectedStatus = 'ALL';
  searchId = '';
  
  statusOptions = [
    { value: 'ALL', label: 'All Status' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'REJECTED', label: 'Rejected' }
  ];

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStockRequests();
  }

  loadStockRequests() {
    this.isLoading = true;
    // Using distributorId = 1 for now (should come from auth service)
    this.purchaseOrderService.getStockRequestBatches(1, this.selectedStatus === 'ALL' ? undefined : this.selectedStatus, this.searchId || undefined)
      .subscribe({
        next: (response: any) => {
          if (response.resultCode === 0) {
            this.stockRequests = response.data.content;
            this.filteredRequests = [...this.stockRequests];
          }
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error loading stock requests:', error);
          this.isLoading = false;
        }
      });
  }

  onFilterChange() {
    this.loadStockRequests();
  }

  onSearch() {
    this.loadStockRequests();
  }

  clearSearch() {
    this.searchId = '';
    this.loadStockRequests();
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

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'HIGH': return '#F44336';
      case 'MEDIUM': return '#FF9800';
      case 'LOW': return '#4CAF50';
      default: return '#757575';
    }
  }

  createNewOrder() {
    this.router.navigate(['/distributor-dashboard/purchase-orders/create']);
  }

  goBack() {
    this.router.navigate(['/distributor-dashboard/purchase-orders']);
  }
}
