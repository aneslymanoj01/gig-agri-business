import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryTeamService } from '../../../shared/services/delivery-team.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-add-delivery-team',
  templateUrl: './add-delivery-team.component.html',
  styleUrls: ['./add-delivery-team.component.scss']
})
export class AddDeliveryTeamComponent implements OnInit {
  deliveryTeamForm!: FormGroup;
  isLoading = false;
  usernameCheckLoading = false;
  usernameValid: boolean | null = null;
  usernameError = '';

  constructor(
    private fb: FormBuilder,
    private deliveryTeamService: DeliveryTeamService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.deliveryTeamForm = this.fb.group({
      name: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      vehicleType: ['', [Validators.required]],
      licenseNumber: ['', [Validators.required]],
      vehicleNumber: ['', [Validators.required]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['Sri Lanka']
    });
  }

  checkUsername(): void {
    const username = this.deliveryTeamForm.get('userName')?.value;
    if (!username || username.trim().length === 0) {
      this.usernameValid = null;
      return;
    }

    this.usernameCheckLoading = true;
    this.usernameValid = null;

    this.deliveryTeamService.checkUsername(username.trim()).subscribe({
      next: (response: any) => {
        if (response.errorCode === 0) {
          this.usernameValid = true;
          this.usernameError = '';
        } else {
          this.usernameValid = false;
          this.usernameError = response.errorDescription || 'Username not available';
        }
        this.usernameCheckLoading = false;
      },
      error: (error) => {
        this.usernameValid = false;
        this.usernameError = 'Error checking username availability';
        this.usernameCheckLoading = false;
      }
    });
  }

  canSubmit(): boolean {
    return this.deliveryTeamForm.valid && this.usernameValid === true && !this.isLoading;
  }

  onSubmit(): void {
    if (this.deliveryTeamForm.valid && this.usernameValid === true) {
      this.isLoading = true;
      
      const teamMemberData = this.deliveryTeamForm.value;

      this.deliveryTeamService.createTeamMember(teamMemberData).subscribe({
        next: (response) => {
          if (response.resultCode === 0) {
            this.notificationService.showSuccess('Delivery team member created successfully!');
            this.router.navigate(['/dashboard/delivery-team']);
          } else {
            this.notificationService.showError(response.resultDescription || 'Failed to create team member');
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.notificationService.showError('Failed to create team member. Please try again.');
          this.isLoading = false;
        }
      });
    }
  }

  onClear(): void {
    this.deliveryTeamForm.reset();
    this.deliveryTeamForm.patchValue({ country: 'Sri Lanka' });
    this.usernameValid = null;
    this.usernameError = '';
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/delivery-team']);
  }
}
