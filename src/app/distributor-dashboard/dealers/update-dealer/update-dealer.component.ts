import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DealerService } from '../../../shared/services/dealer.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-update-dealer',
  templateUrl: './update-dealer.component.html',
  styleUrls: ['./update-dealer.component.scss']
})
export class UpdateDealerComponent implements OnInit {
  searchForm!: FormGroup;
  updateForm!: FormGroup;
  isSearching = false;
  isUpdating = false;
  dealerData: any = null;

  constructor(
    private fb: FormBuilder,
    private dealerService: DealerService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.searchForm = this.fb.group({
      dealerId: ['', [Validators.required]]
    });

    this.updateForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      businessType: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]]
    });
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.isSearching = true;
    const dealerId = this.searchForm.get('dealerId')?.value;

    this.dealerService.searchDealers({ id: dealerId }).subscribe({
      next: (response) => {
        this.isSearching = false;
        if (response.resultCode === 0 && response.data.dealers.length > 0) {
          this.dealerData = response.data.dealers[0];
          this.populateUpdateForm();
          this.notificationService.showSuccess('Dealer found successfully!');
        } else {
          this.dealerData = null;
          this.notificationService.showError('Dealer not found');
        }
      },
      error: (error) => {
        this.isSearching = false;
        console.error('Search error:', error);
        this.notificationService.showError('Failed to search dealer');
      }
    });
  }

  private populateUpdateForm(): void {
    if (this.dealerData) {
      this.updateForm.patchValue({
        name: this.dealerData.name,
        phone: this.dealerData.phone,
        city: this.dealerData.city,
        state: this.dealerData.state,
        businessType: this.dealerData.businessType,
        contactPerson: this.dealerData.contactPerson
      });
    }
  }

  onUpdate(): void {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    this.isUpdating = true;
    const updateData = {
      ...this.updateForm.value,
      // Include original data that shouldn't be changed
      email: this.dealerData.email,
      streetAddress: this.dealerData.streetAddress || '',
      postalCode: this.dealerData.postalCode || '',
      country: this.dealerData.country || 'Sri Lanka',
      status: this.dealerData.status
    };

    this.dealerService.updateDealer(this.dealerData.id, updateData).subscribe({
      next: (response) => {
        this.isUpdating = false;
        if (response.resultCode === 0) {
          this.notificationService.showSuccess('Dealer updated successfully!');
          this.router.navigate(['/distributor-dashboard/dealers']);
        } else {
          this.notificationService.showError(response.resultDescription || 'Failed to update dealer');
        }
      },
      error: (error) => {
        this.isUpdating = false;
        console.error('Update error:', error);
        const errorMessage = error.error?.resultDescription || error.message || 'Failed to update dealer';
        this.notificationService.showError(errorMessage);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/distributor-dashboard/dealers']);
  }
}
