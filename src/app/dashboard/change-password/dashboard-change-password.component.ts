import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-dashboard-change-password',
  templateUrl: './dashboard-change-password.component.html',
  styleUrls: ['./dashboard-change-password.component.scss']
})
export class DashboardChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  isLoading = false;
  hideOldPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordStrengthValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);

    const valid = hasNumber && hasUpper && hasLower && hasSpecial && value.length >= 8;
    return valid ? null : { passwordStrength: true };
  }

  private passwordMatchValidator(group: AbstractControl): {[key: string]: any} | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    const { oldPassword, newPassword } = this.changePasswordForm.value;

    this.authService.changePassword({ oldPassword, newPassword }).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (!response || response.errorCode === 0) {
          this.notificationService.showSuccess('Password changed successfully! Please login again.');
          // Logout user and redirect to login
          this.authService.logout();
        } else if (response.errorCode === 1) {
          this.notificationService.showError(response.errorDescription || 'Failed to change password');
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.showError('Failed to change password. Please try again.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.changePasswordForm.controls).forEach(key => {
      this.changePasswordForm.get(key)?.markAsTouched();
    });
  }
}
