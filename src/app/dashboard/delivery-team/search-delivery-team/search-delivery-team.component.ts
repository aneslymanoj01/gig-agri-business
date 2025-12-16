import { Component, OnInit } from '@angular/core';
import { DeliveryTeamService } from '../../../shared/services/delivery-team.service';

export interface DeliveryTeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  licenseNumber: string;
  vehicleNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  status: string;
}

@Component({
  selector: 'app-search-delivery-team',
  templateUrl: './search-delivery-team.component.html',
  styleUrls: ['./search-delivery-team.component.scss']
})
export class SearchDeliveryTeamComponent implements OnInit {
  deliveryTeam: DeliveryTeamMember[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'vehicleType', 'vehicleNumber', 'city', 'status'];
  
  searchFilters = {
    name: '',
    vehicleType: '',
    city: ''
  };

  // Pagination
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  isFirst = true;
  isLast = true;
  isLoading = false;

  constructor(private deliveryTeamService: DeliveryTeamService) {}

  ngOnInit(): void {
    this.loadDeliveryTeam();
  }

  loadDeliveryTeam(): void {
    this.isLoading = true;
    
    const params: any = {
      page: this.currentPage,
      size: this.pageSize
    };

    // Add search filters if they have values
    if (this.searchFilters.name.trim()) {
      params.name = this.searchFilters.name.trim();
    }
    if (this.searchFilters.vehicleType.trim()) {
      params.vehicleType = this.searchFilters.vehicleType.trim();
    }
    if (this.searchFilters.city.trim()) {
      params.city = this.searchFilters.city.trim();
    }

    this.deliveryTeamService.searchDeliveryTeam(params).subscribe({
      next: (response) => {
        this.deliveryTeam = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.isFirst = response.data.first;
        this.isLast = response.data.last;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading delivery team:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 0;
    this.loadDeliveryTeam();
  }

  onClear(): void {
    this.searchFilters = {
      name: '',
      vehicleType: '',
      city: ''
    };
    this.currentPage = 0;
    this.loadDeliveryTeam();
  }

  onRefresh(): void {
    this.loadDeliveryTeam();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadDeliveryTeam();
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
}
