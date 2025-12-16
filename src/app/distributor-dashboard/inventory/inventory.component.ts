import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService, InventoryItem } from '../../shared/services/purchase-order.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventoryItems: InventoryItem[] = [];
  distributorId: number = 0;
  isLoading = false;

  constructor(private purchaseOrderService: PurchaseOrderService) {}

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory() {
    this.isLoading = true;
    this.purchaseOrderService.getInventory().subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          this.inventoryItems = response.data.inventory;
          this.distributorId = response.data.distributorId;
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading inventory:', error);
        this.isLoading = false;
      }
    });
  }

  getStockStatus(availableQuantity: number): string {
    if (availableQuantity === 0) return 'out-of-stock';
    if (availableQuantity < 10) return 'low-stock';
    return 'in-stock';
  }

  getStockStatusText(availableQuantity: number): string {
    if (availableQuantity === 0) return 'Out of Stock';
    if (availableQuantity < 10) return 'Low Stock';
    return 'In Stock';
  }
}
