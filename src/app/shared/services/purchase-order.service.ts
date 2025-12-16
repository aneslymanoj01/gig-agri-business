import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  orderId: number;
  status: string;
  totalAmount: number;
  itemCount: number;
  createdAt: string;
  items: OrderItem[];
}

export interface OrdersResponse {
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

export interface InventoryItem {
  productName: string;
  totalQuantity: number;
  availableQuantity: number;
  reservedQuantity: number;
  unitPrice: number;
}

export interface InventoryResponse {
  resultCode: number;
  resultDescription: string;
  data: {
    distributorId: number;
    inventory: InventoryItem[];
  };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  stockQuantity: number;
  reorderLevel?: number;
  category: string;
  sku: string;
  status: string;
}

export interface ProductResponse {
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

export interface StockRequestItem {
  productId: number;
  quantity: number;
}

export interface CreateStockRequestBatch {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  notes?: string;
  items: StockRequestItem[];
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private baseUrl = 'http://localhost:8182/pohoro-master-service/master';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/products`);
  }

  createStockRequestBatch(request: CreateStockRequestBatch): Observable<any> {
    return this.http.post(`${this.baseUrl}/stock-request-batches`, request);
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get(`http://localhost:8183/pohoro-distributor-service/distributor/orders/${orderId}`);
  }

  approveOrder(orderId: number): Observable<any> {
    return this.http.put(`http://localhost:8183/pohoro-distributor-service/distributor/orders/${orderId}/approve`, {});
  }

  rejectOrder(orderId: number, rejectReason: string): Observable<any> {
    return this.http.put(`http://localhost:8183/pohoro-distributor-service/distributor/orders/${orderId}/reject`, {
      rejectReason: rejectReason
    });
  }

  getOrders(status?: string, dealerId?: number, page: number = 0, size: number = 10): Observable<OrdersResponse> {
    let params = `page=${page}&size=${size}`;
    if (status) params += `&status=${status}`;
    if (dealerId) params += `&dealerId=${dealerId}`;
    
    return this.http.get<OrdersResponse>(`http://localhost:8183/pohoro-distributor-service/distributor/orders?${params}`);
  }

  assignDelivery(orderId: number, request: any): Observable<any> {
    return this.http.put(`http://localhost:8183/pohoro-distributor-service/distributor/orders/${orderId}/assign-delivery`, request);
  }

  trackOrder(distributorId: number, orderId: number): Observable<any> {
    return this.http.get(`http://localhost:8186/pohoro-operations-service/operations/orders/distributor/${distributorId}/${orderId}/track`);
  }

  getInventory(): Observable<InventoryResponse> {
    return this.http.get<InventoryResponse>('http://localhost:8183/pohoro-distributor-service/distributor/inventory');
  }

  getStockRequestBatches(distributorId: number, status?: string, id?: string): Observable<any> {
    let params = `distributorId=${distributorId}`;
    if (status) params += `&status=${status}`;
    if (id) params += `&id=${id}`;
    
    return this.http.get(`${this.baseUrl}/stock-request-batches?${params}`);
  }

  getPurchaseOrders(): Observable<any[]> {
    // Mock data for now - replace with actual API call when available
    return new Observable(observer => {
      observer.next([]);
      observer.complete();
    });
  }
}
