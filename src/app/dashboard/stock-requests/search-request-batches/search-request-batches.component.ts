import { Component, OnInit } from '@angular/core';
import { StockRequestService } from '../../../shared/services/stock-request.service';

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

@Component({
  selector: 'app-search-request-batches',
  templateUrl: './search-request-batches.component.html',
  styleUrls: ['./search-request-batches.component.scss']
})
export class SearchRequestBatchesComponent implements OnInit {
  requestBatches: RequestBatch[] = [];
  displayedColumns: string[] = ['id', 'distributorId', 'priority', 'status', 'requestedAt', 'rejectionReason', 'actions'];
  selectedBatch: RequestBatch | null = null;
  
  searchFilters = {
    id: '',
    distributorId: '',
    status: ''
  };

  // Pagination
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  isFirst = true;
  isLast = true;
  isLoading = false;

  constructor(private stockRequestService: StockRequestService) {}

  ngOnInit(): void {
    this.loadRequestBatches();
  }

  loadRequestBatches(): void {
    this.isLoading = true;
    
    const params: any = {
      page: this.currentPage,
      size: this.pageSize
    };

    // Add search filters if they have values
    if (this.searchFilters.id && this.searchFilters.id.trim()) {
      params.id = this.searchFilters.id.trim();
    }
    if (this.searchFilters.distributorId && this.searchFilters.distributorId.toString().trim()) {
      params.distributorId = this.searchFilters.distributorId;
    }
    if (this.searchFilters.status && this.searchFilters.status.trim()) {
      params.status = this.searchFilters.status.trim();
    }

    this.stockRequestService.searchRequestBatches(params).subscribe({
      next: (response) => {
        this.requestBatches = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.isFirst = response.data.first;
        this.isLast = response.data.last;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading request batches:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 0;
    this.loadRequestBatches();
  }

  onClear(): void {
    this.searchFilters = {
      id: '',
      distributorId: '',
      status: ''
    };
    this.currentPage = 0;
    this.loadRequestBatches();
  }

  onRefresh(): void {
    this.loadRequestBatches();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadRequestBatches();
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

  viewBatchDetails(batch: RequestBatch): void {
    this.selectedBatch = batch;
  }

  closeBatchDetails(): void {
    this.selectedBatch = null;
  }
}
