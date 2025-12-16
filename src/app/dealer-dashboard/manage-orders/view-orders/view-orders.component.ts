import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  orderId: number;
  status: string;
  totalAmount: number;
  itemCount: number;
  createdAt: string;
  items: OrderItem[];
}

interface OrdersResponse {
  resultCode: number;
  resultDescription: string;
  data: {
    orders: Order[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  loading = false;
  error = '';
  selectedStatus = '';
  expandedOrderId: number | null = null;

  statusOptions = [
    { value: '', label: 'All Orders' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'ASSIGNED', label: 'Assigned' },
    { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'CANCELLED', label: 'Cancelled' }
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.error = '';

    this.http.get<OrdersResponse>('http://localhost:8183/pohoro-distributor-service/dealers/orders').subscribe({
      next: (response) => {
        this.loading = false;
        if (response.resultCode === 0) {
          this.orders = response.data.orders;
          this.applyFilter();
        } else {
          this.error = response.resultDescription || 'Failed to load orders';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load orders';
      }
    });
  }

  onStatusChange() {
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedStatus) {
      this.filteredOrders = this.orders.filter(order => order.status === this.selectedStatus);
    } else {
      this.filteredOrders = [...this.orders];
    }
  }

  toggleOrderDetails(orderId: number) {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'status-pending';
      case 'APPROVED': return 'status-approved';
      case 'ASSIGNED': return 'status-assigned';
      case 'OUT_FOR_DELIVERY': return 'status-out-for-delivery';
      case 'DELIVERED': return 'status-delivered';
      case 'CONFIRMED': return 'status-confirmed';
      case 'CANCELLED': return 'status-cancelled';
      default: return 'status-default';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  goBack() {
    this.router.navigate(['/dealer-dashboard/manage-orders']);
  }
}
