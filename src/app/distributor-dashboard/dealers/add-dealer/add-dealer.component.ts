import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DealerService } from '../../../shared/services/dealer.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-add-dealer',
  templateUrl: './add-dealer.component.html',
  styleUrls: ['./add-dealer.component.scss']
})
export class AddDealerComponent implements OnInit {
  dealerForm!: FormGroup;
  isLoading = false;
  usernameCheckLoading = false;
  usernameValid: boolean | null = null;
  usernameError = '';

  constructor(
    private fb: FormBuilder,
    private dealerService: DealerService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.dealerForm = this.fb.group({
      name: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['Sri Lanka', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      businessType: ['', [Validators.required]]
    });
  }

  checkUsername(): void {
    const userName = this.dealerForm.get('userName')?.value;
    if (!userName || userName.trim() === '') {
      this.usernameValid = null;
      return;
    }

    this.usernameCheckLoading = true;
    this.usernameValid = null;

    this.dealerService.checkUsername(userName.trim()).subscribe({
      next: (response) => {
        this.usernameCheckLoading = false;
        if (response.errorCode === 0) {
          this.usernameValid = true;
          this.usernameError = '';
        } else {
          this.usernameValid = false;
          this.usernameError = response.errorDescription || 'Username not available';
        }
      },
      error: (error) => {
        this.usernameCheckLoading = false;
        this.usernameValid = false;
        this.usernameError = 'Error checking username';
      }
    });
  }

  canSubmit(): boolean {
    return this.dealerForm.valid && !this.isLoading && this.usernameValid === true;
  }

  onSubmit(): void {
    if (this.dealerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    if (this.usernameValid !== true) {
      this.notificationService.showError('Please check username availability first');
      return;
    }

    this.isLoading = true;
    const dealerData = this.dealerForm.value;

    this.dealerService.createDealer(dealerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.resultCode === 0) {
          this.notificationService.showSuccess('Dealer created successfully!');
          this.router.navigate(['/distributor-dashboard/dealers']);
        } else {
          this.notificationService.showError(response.resultDescription || 'Failed to create dealer');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Create dealer error:', error);
        const errorMessage = error.error?.resultDescription || error.message || 'Failed to create dealer';
        this.notificationService.showError(errorMessage);
      }
    });
  }

  onClear(): void {
    this.dealerForm.reset();
    this.dealerForm.patchValue({ country: 'Sri Lanka' });
    this.usernameValid = null;
    this.usernameError = '';
  }

  onCancel(): void {
    this.router.navigate(['/distributor-dashboard/dealers']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.dealerForm.controls).forEach(key => {
      this.dealerForm.get(key)?.markAsTouched();
    });
  }

  goBack(): void {
    this.router.navigate(['/distributor-dashboard/dealers']);
  }
}
