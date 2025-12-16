import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DealerService } from '../../../shared/services/dealer.service';
import { NotificationService } from '../../../shared/services/notification.service';

export interface Dealer {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  businessType: string;
  contactPerson: string;
  status: string;
}

export interface SearchDealersResponse {
  resultCode: number;
  resultDescription: string;
  data: {
    dealers: Dealer[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
}

@Component({
  selector: 'app-search-dealer',
  templateUrl: './search-dealer.component.html',
  styleUrls: ['./search-dealer.component.scss']
})
export class SearchDealerComponent implements OnInit {
  searchForm!: FormGroup;
  isLoading = false;
  searchResults: any = null;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'city', 'businessType', 'status'];
  currentPage = 0;
  pageSize = 10;

  constructor(
    private fb: FormBuilder,
    private dealerService: DealerService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadDealers();
  }

  private initializeForm(): void {
    this.searchForm = this.fb.group({
      name: [''],
      city: [''],
      status: ['']
    });
  }

  loadDealers(): void {
    this.isLoading = true;
    
    const params: any = {
      page: this.currentPage,
      size: this.pageSize
    };

    // Add form values if they exist
    const formValues = this.searchForm?.value || {};
    Object.keys(formValues).forEach(key => {
      if (formValues[key] && formValues[key].trim() !== '') {
        params[key] = formValues[key].trim();
      }
    });

    this.dealerService.searchDealers(params).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.resultCode === 0) {
          this.searchResults = response.data;
        } else {
          this.notificationService.showError(response.resultDescription || 'Search failed');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Search error:', error);
        this.notificationService.showError('Failed to search dealers');
      }
    });
  }

  onSearch(): void {
    this.currentPage = 0;
    this.loadDealers();
  }

  onRefresh(): void {
    this.loadDealers();
  }

  onClear(): void {
    this.searchForm.reset();
    this.currentPage = 0;
    this.loadDealers();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadDealers();
  }

  getPageNumbers(): number[] {
    if (!this.searchResults) return [];
    
    const totalPages = this.searchResults.totalPages;
    const currentPage = this.searchResults.page;
    const pages: number[] = [];
    
    // Show up to 5 page numbers
    const maxPages = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(0, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}
