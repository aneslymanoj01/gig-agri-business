import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductRequest {
  name: string;
  sku?: string;
  category?: string;
  description?: string;
  unitPrice: number;
  stockQuantity: number;
  reorderLevel?: number;
}

export interface ProductUpdateRequest {
  name: string;
  sku: string;
  category: string;
  description: string;
  unitPrice: number;
  stockQuantity: number;
  status: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  description: string;
  unitPrice: number;
  stockQuantity: number;
}

export interface ProductResponse {
  resultCode: number;
  resultDescription: string;
  data: {
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    stockQuantity: number;
    reorderLevel: number;
    category: string;
    sku: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProductSearchResponse {
  resultCode: number;
  resultDescription: string;
  data: {
    content: Product[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8182/pohoro-master-service/master/products';

  constructor(private http: HttpClient) {}

  createProduct(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.baseUrl, product);
  }

  searchProducts(params: any): Observable<ProductSearchResponse> {
    let httpParams = new HttpParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });

    return this.http.get<ProductSearchResponse>(this.baseUrl, { params: httpParams });
  }

  updateProduct(id: number, product: ProductUpdateRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.baseUrl}/${id}`, product);
  }
}
