import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  template: `
    <div class="page-header">
      <h1><mat-icon>inventory_2</mat-icon> Product Management</h1>
      <p>Manage your product catalog and inventory</p>
    </div>

    <div class="action-cards">
      <mat-card class="action-card clickable" (click)="navigateToAddProduct()">
        <mat-card-content>
          <mat-icon>add_box</mat-icon>
          <h3>Create Product</h3>
          <p>Add new products to your catalog</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="action-card clickable" (click)="navigateToUpdateProduct()">
        <mat-card-content>
          <mat-icon>edit</mat-icon>
          <h3>Update Product</h3>
          <p>Modify existing product information</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="action-card clickable" (click)="navigateToSearchProducts()">
        <mat-card-content>
          <mat-icon>search</mat-icon>
          <h3>Search Products</h3>
          <p>Find and manage products in catalog</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 32px;
      h1 {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #2E7D32;
        margin: 0 0 8px 0;
        mat-icon { font-size: 32px; width: 32px; height: 32px; }
      }
      p { color: #666; margin: 0; }
    }
    .action-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }
    .action-card {
      position: relative;
      &.clickable {
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      }
      mat-card-content {
        text-align: center;
        padding: 32px 24px;
        mat-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
          color: #4CAF50;
          margin-bottom: 16px;
        }
        h3 { color: #333; margin: 0 0 8px 0; }
        p { color: #666; margin: 0; }
      }
      .coming-soon {
        position: absolute;
        top: 16px;
        right: 16px;
        background: #FF9800;
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 500;
      }
    }
  `]
})
export class ProductsComponent {
  constructor(private router: Router) {}

  navigateToAddProduct(): void {
    this.router.navigate(['/dashboard/products/add']);
  }

  navigateToSearchProducts(): void {
    this.router.navigate(['/dashboard/products/search']);
  }

  navigateToUpdateProduct(): void {
    this.router.navigate(['/dashboard/products/update']);
  }
}
