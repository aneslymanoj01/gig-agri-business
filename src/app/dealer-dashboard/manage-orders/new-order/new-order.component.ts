import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../shared/services/notification.service';

interface InventoryItem {
  productName: string;
  totalQuantity: number;
  availableQuantity: number;
  reservedQuantity: number;
  unitPrice: number;
}

interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface DeliveryAddress {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
}

interface CreateOrderRequest {
  items: OrderItem[];
  deliveryAddress: DeliveryAddress;
  priority: string;
}

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  inventory: InventoryItem[] = [];
  orderItems: OrderItem[] = [];
  deliveryAddress: DeliveryAddress = {
    streetAddress: '',
    city: '',
    state: '',
    postalCode: ''
  };
  priority = 'NORMAL';
  loading = false;
  error = '';
  totalAmount = 0;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory() {
    this.loading = true;
    this.http.get<any>('http://localhost:8183/pohoro-distributor-service/dealers/inventory').subscribe({
      next: (response) => {
        this.loading = false;
        if (response.resultCode === 0) {
          this.inventory = response.data.inventory;
        } else {
          this.error = 'Failed to load inventory';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load inventory';
      }
    });
  }

  addToOrder(item: InventoryItem, quantity: number) {
    if (quantity <= 0 || quantity > item.availableQuantity) return;

    const existingIndex = this.orderItems.findIndex(oi => oi.productName === item.productName);
    if (existingIndex >= 0) {
      const newQuantity = this.orderItems[existingIndex].quantity + quantity;
      if (newQuantity <= item.availableQuantity) {
        this.orderItems[existingIndex].quantity = newQuantity;
      }
    } else {
      this.orderItems.push({
        productName: item.productName,
        quantity: quantity,
        unitPrice: item.unitPrice
      });
    }
    this.calculateTotal();
  }

  removeFromOrder(productName: string) {
    this.orderItems = this.orderItems.filter(item => item.productName !== productName);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.orderItems.reduce((total, item) => 
      total + (item.quantity * item.unitPrice), 0
    );
  }

  createOrder() {
    if (this.orderItems.length === 0) {
      this.error = 'Please add items to your order';
      return;
    }

    if (!this.isDeliveryAddressValid()) {
      this.error = 'Please fill in all delivery address fields';
      return;
    }

    this.loading = true;
    this.error = '';

    const orderRequest: CreateOrderRequest = {
      items: this.orderItems,
      deliveryAddress: this.deliveryAddress,
      priority: this.priority
    };

    this.http.post<any>('http://localhost:8183/pohoro-distributor-service/dealers/create-order', orderRequest).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.resultCode === 0) {
          this.notificationService.showSuccess('Order created successfully!');
          this.router.navigate(['/dealer-dashboard/manage-orders']);
        } else {
          this.error = response.resultDescription || 'Failed to create order';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to create order';
      }
    });
  }

  isDeliveryAddressValid(): boolean {
    return !!(this.deliveryAddress.streetAddress && 
              this.deliveryAddress.city && 
              this.deliveryAddress.state && 
              this.deliveryAddress.postalCode);
  }

  isCreateOrderEnabled(): boolean {
    return this.orderItems.length > 0 && this.isDeliveryAddressValid() && !this.loading;
  }

  goBack() {
    this.router.navigate(['/dealer-dashboard/manage-orders']);
  }
}
