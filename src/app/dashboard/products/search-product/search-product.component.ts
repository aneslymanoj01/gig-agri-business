import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';

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
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'sku', 'category', 'unitPrice', 'stockQuantity', 'description'];
  
  searchFilters = {
    id: '',
    name: '',
    category: ''
  };

  // Pagination
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  isFirst = true;
  isLast = true;
  isLoading = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    
    const params: any = {
      page: this.currentPage,
      size: this.pageSize
    };

    // Add search filters if they have values
    if (this.searchFilters.id.trim()) {
      params.id = this.searchFilters.id.trim();
    }
    if (this.searchFilters.name.trim()) {
      params.name = this.searchFilters.name.trim();
    }
    if (this.searchFilters.category.trim()) {
      params.category = this.searchFilters.category.trim();
    }

    this.productService.searchProducts(params).subscribe({
      next: (response) => {
        this.products = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.isFirst = response.data.first;
        this.isLast = response.data.last;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 0;
    this.loadProducts();
  }

  onClear(): void {
    this.searchFilters = {
      id: '',
      name: '',
      category: ''
    };
    this.currentPage = 0;
    this.loadProducts();
  }

  onRefresh(): void {
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(0, this.currentPage - 2);
    const end = Math.min(this.totalPages - 1, this.currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  goBack(): void {
    this.router.navigate(['/dashboard/products']);
  }
}
