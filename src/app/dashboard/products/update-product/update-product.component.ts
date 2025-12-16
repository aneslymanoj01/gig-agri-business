import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/services/product.service';
import { NotificationService } from '../../../shared/services/notification.service';

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  description: string;
  unitPrice: number;
  stockQuantity: number;
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  productId: number | null = null;
  selectedProduct: Product | null = null;
  updateForm!: FormGroup;
  isSearching = false;
  isUpdating = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.updateForm = this.fb.group({
      unitPrice: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSearchProduct(): void {
    if (!this.productId) {
      this.notificationService.showError('Please enter a product ID');
      return;
    }

    this.isSearching = true;
    this.selectedProduct = null;

    const searchParams = {
      id: this.productId
    };

    this.productService.searchProducts(searchParams).subscribe({
      next: (response) => {
        if (response.data.content.length > 0) {
          this.selectedProduct = response.data.content[0];
          this.updateForm.patchValue({
            unitPrice: this.selectedProduct.unitPrice,
            stockQuantity: this.selectedProduct.stockQuantity
          });
        } else {
          this.notificationService.showError('Product not found');
        }
        this.isSearching = false;
      },
      error: (error) => {
        this.notificationService.showError('Product not found');
        this.isSearching = false;
      }
    });
  }

  onUpdateProduct(): void {
    if (this.updateForm.valid && this.selectedProduct) {
      this.isUpdating = true;

      const updateData = {
        name: this.selectedProduct.name,
        sku: this.selectedProduct.sku,
        category: this.selectedProduct.category,
        description: this.selectedProduct.description,
        unitPrice: parseFloat(this.updateForm.value.unitPrice),
        stockQuantity: parseInt(this.updateForm.value.stockQuantity),
        status: 'ACTIVE'
      };

      this.productService.updateProduct(this.selectedProduct.id, updateData).subscribe({
        next: (response) => {
          if (response.resultCode === 0) {
            this.notificationService.showSuccess('Product updated successfully!');
            this.onClear(); // Clear form and return to initial state
          } else {
            this.notificationService.showError(response.resultDescription || 'Failed to update product');
          }
          this.isUpdating = false;
        },
        error: (error) => {
          this.notificationService.showError('Failed to update product. Please try again.');
          this.isUpdating = false;
        }
      });
    }
  }

  onClear(): void {
    this.selectedProduct = null;
    this.productId = null;
    this.updateForm.reset();
  }
}
