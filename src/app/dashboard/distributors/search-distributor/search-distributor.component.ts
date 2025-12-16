import { Component, OnInit } from '@angular/core';
import { DistributorService } from '../../../shared/services/distributor.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Distributor } from '../../../shared/models/distributor.models';

@Component({
  selector: 'app-search-distributor',
  templateUrl: './search-distributor.component.html',
  styleUrls: ['./search-distributor.component.scss']
})
export class SearchDistributorComponent implements OnInit {
  distributors: Distributor[] = [];
  isLoading = false;
  
  // Pagination
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  isFirst = true;
  isLast = true;

  // Table columns
  displayedColumns: string[] = ['id', 'name', 'email', 'contactNo', 'city', 'contactPerson'];

  constructor(
    private distributorService: DistributorService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadDistributors();
  }

  loadDistributors(): void {
    this.isLoading = true;
    
    this.distributorService.getAllDistributors(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        if (response.resultCode === 0 && response.data) {
          this.distributors = response.data.content;
          this.currentPage = response.data.page;
          this.pageSize = response.data.size;
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.isFirst = response.data.first;
          this.isLast = response.data.last;
        } else {
          this.notificationService.showError(response.resultDescription || 'Failed to load distributors');
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading distributors:', error);
        this.notificationService.showError('Failed to load distributors. Please try again.');
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadDistributors();
  }

  onRefresh(): void {
    this.currentPage = 0;
    this.loadDistributors();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(0, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages - 1, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(0, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
