import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-delivery-change-password',
  templateUrl: './delivery-change-password.component.html',
  styleUrls: ['./delivery-change-password.component.scss']
})
export class DeliveryChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isLoading = false;
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.isLoading = true;
      
      const currentUser = this.authService.getCurrentUser();
      const changePasswordRequest = {
        oldPassword: this.changePasswordForm.value.currentPassword,
        newPassword: this.changePasswordForm.value.newPassword
      };

      this.authService.changePassword(changePasswordRequest).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.errorCode === 0) {
            this.notificationService.showSuccess('Password changed successfully!');
            this.router.navigate(['/delivery-dashboard/manage-orders']);
          } else {
            this.notificationService.showError(response.errorDescription || 'Failed to change password');
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.notificationService.showError('Failed to change password. Please try again.');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/delivery-dashboard/manage-orders']);
  }
}
