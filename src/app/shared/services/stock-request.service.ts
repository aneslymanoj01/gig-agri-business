import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RequestBatchItem {
  productId: number;
  productName: string;
  quantity: number;
}

export interface RequestBatch {
  id: string;
  distributorId: number;
  priority: string;
  notes: string;
  items: RequestBatchItem[];
  status: string;
  requestedAt: string;
  processedAt: string | null;
  processedBy: string | null;
  rejectionReason: string | null;
}

export interface ProcessBatchRequest {
  action: 'APPROVE' | 'REJECT';
  remarks: string;
}

export interface ProcessBatchResponse {
  resultCode: number;
  resultDescription: string;
  data: RequestBatch;
}

export interface RequestBatchSearchResponse {
  resultCode: number;
  resultDescription: string;
  data: {
    content: RequestBatch[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StockRequestService {
  private baseUrl = 'http://localhost:8182/pohoro-master-service/master/stock-request-batches';

  constructor(private http: HttpClient) {}

  searchRequestBatches(params: any): Observable<RequestBatchSearchResponse> {
    let httpParams = new HttpParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });

    return this.http.get<RequestBatchSearchResponse>(this.baseUrl, { params: httpParams });
  }

  processBatch(batchId: string, request: ProcessBatchRequest): Observable<ProcessBatchResponse> {
    return this.http.put<ProcessBatchResponse>(`${this.baseUrl}/${batchId}`, request);
  }
}
