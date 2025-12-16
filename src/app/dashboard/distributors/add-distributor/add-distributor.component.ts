import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DistributorService } from '../../../shared/services/distributor.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-add-distributor',
  templateUrl: './add-distributor.component.html',
  styleUrls: ['./add-distributor.component.scss']
})
export class AddDistributorComponent implements OnInit {
  distributorForm!: FormGroup;
  isLoading = false;
  usernameCheckLoading = false;
  usernameValid: boolean | null = null;
  usernameError = '';

  constructor(
    private fb: FormBuilder,
    private distributorService: DistributorService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupUsernameValidation();
  }

  private initializeForm(): void {
    this.distributorForm = this.fb.group({
      name: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: [{value: 'SRILANKA', disabled: false}, [Validators.required]],
      contactPerson: ['', [Validators.required]]
    });
  }

  private setupUsernameValidation(): void {
    this.distributorForm.get('userName')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.usernameValid = null;
        this.usernameError = '';
      });
  }

  checkUsername(): void {
    const userName = this.distributorForm.get('userName')?.value;
    if (!userName || userName.trim() === '') {
      this.usernameValid = null;
      return;
    }

    this.usernameCheckLoading = true;
    this.usernameValid = null;

    this.distributorService.checkUsername(userName.trim()).subscribe({
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
    return this.distributorForm.valid && 
           this.usernameValid === true && 
           !this.isLoading && 
           !this.usernameCheckLoading;
  }

  onSubmit(): void {
    if (!this.canSubmit()) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    const distributorData = this.distributorForm.value;

    this.distributorService.createDistributor(distributorData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.resultCode === 0) {
          this.notificationService.showSuccess('Distributor created successfully! Ask your distributor to check his password.');
          this.router.navigate(['/dashboard/distributors']);
        } else {
          this.notificationService.showError(response.resultDescription || 'Failed to create distributor');
        }
      },
      error: (error) => {
        this.isLoading = false;
        const errorMessage = error.error?.resultDescription || error.error?.message || 'Failed to create distributor';
        this.notificationService.showError(errorMessage);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/distributors']);
  }

  onClear(): void {
    this.distributorForm.reset();
    this.distributorForm.patchValue({
      country: 'SRILANKA'
    });
    this.usernameValid = null;
    this.usernameError = '';
    this.usernameCheckLoading = false;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.distributorForm.controls).forEach(key => {
      this.distributorForm.get(key)?.markAsTouched();
    });
  }
}
