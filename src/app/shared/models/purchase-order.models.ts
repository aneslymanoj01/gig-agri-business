export interface PurchaseOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PurchaseOrder {
  id?: string;
  orderNumber?: string;
  supplierId: string;
  supplierName: string;
  orderDate: Date;
  expectedDeliveryDate: Date;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'DELIVERED';
  items: PurchaseOrderItem[];
  totalAmount: number;
  notes?: string;
  createdBy?: string;
  createdAt?: Date;
}

export interface CreatePurchaseOrderRequest {
  supplierId: string;
  expectedDeliveryDate: string;
  items: PurchaseOrderItem[];
  notes?: string;
}
