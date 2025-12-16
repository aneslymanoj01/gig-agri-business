import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrderService, Product } from '../../../shared/services/purchase-order.service';
import { NotificationService } from '../../../shared/services/notification.service';

interface SelectedItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.scss']
})
export class CreatePurchaseOrderComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedItems: SelectedItem[] = [];
  priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM';
  notes = '';
  searchTerm = '';
  isLoading = false;
  isSubmitting = false;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.purchaseOrderService.getProducts().subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          this.products = response.data.content.filter(p => p.status === 'ACTIVE');
          this.filteredProducts = [...this.products];
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        this.notificationService.showError('Failed to load products');
        this.isLoading = false;
      }
    });
  }

  filterProducts() {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = [...this.products];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    }
  }

  addItem(product: Product) {
    const existingItem = this.selectedItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.quantity * product.unitPrice;
    } else {
      this.selectedItems.push({
        product,
        quantity: 1,
        totalPrice: product.unitPrice
      });
    }
  }

  removeItem(index: number) {
    this.selectedItems.splice(index, 1);
  }

  updateQuantity(item: SelectedItem, quantity: number) {
    if (quantity > 0) {
      item.quantity = quantity;
      item.totalPrice = quantity * item.product.unitPrice;
    }
  }

  getTotalAmount(): number {
    return this.selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  onSubmit() {
    if (this.selectedItems.length === 0) {
      this.notificationService.showError('Please add at least one item');
      return;
    }

    this.isSubmitting = true;
    const request = {
      priority: this.priority,
      notes: this.notes || undefined,
      items: this.selectedItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };

    this.purchaseOrderService.createStockRequestBatch(request).subscribe({
      next: (response: any) => {
        if (response.resultCode === 0) {
          this.notificationService.showSuccess('Stock request batch created successfully!');
          this.router.navigate(['/distributor-dashboard/purchase-orders']);
        } else {
          this.notificationService.showError(response.resultDescription || 'Failed to create stock request');
        }
        this.isSubmitting = false;
      },
      error: (error: any) => {
        this.notificationService.showError('Failed to create stock request batch');
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/distributor-dashboard/purchase-orders']);
  }
}
