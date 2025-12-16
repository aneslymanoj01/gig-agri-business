import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      sku: ['', [Validators.maxLength(100)]],
      category: ['', [Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(1000)]],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      reorderLevel: ['']
    });
  }

  canSubmit(): boolean {
    return this.productForm.valid && !this.isLoading;
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.isLoading = true;
      
      const productData = {
        ...this.productForm.value,
        unitPrice: parseFloat(this.productForm.value.unitPrice),
        stockQuantity: parseInt(this.productForm.value.stockQuantity),
        reorderLevel: this.productForm.value.reorderLevel ? parseInt(this.productForm.value.reorderLevel) : null
      };

      this.productService.createProduct(productData).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Product created successfully!');
          this.router.navigate(['/dashboard/products']);
        },
        error: (error) => {
          this.notificationService.showError('Failed to create product. Please try again.');
          this.isLoading = false;
        }
      });
    }
  }

  onClear(): void {
    this.productForm.reset();
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/products']);
  }

  goBack(): void {
    this.router.navigate(['/dashboard/products']);
  }
}
