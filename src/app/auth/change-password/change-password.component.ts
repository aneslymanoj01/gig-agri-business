import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
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
        
        // If response is empty (null/undefined) or errorCode is 0, consider it success
        if (!response || response.errorCode === 0) {
          this.notificationService.showSuccess('Password changed successfully! Please login again.');
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
    // If accessed from dashboard, go back to dashboard
    // If accessed from login (password change required), go to login
    if (this.router.url.includes('/dashboard/')) {
      this.router.navigate(['/dashboard']);
    } else if (this.router.url.includes('/distributor-dashboard/')) {
      this.router.navigate(['/distributor-dashboard']);
    } else if (this.router.url.includes('/dealer-dashboard/')) {
      this.router.navigate(['/dealer-dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.changePasswordForm.controls).forEach(key => {
      this.changePasswordForm.get(key)?.markAsTouched();
    });
  }

  getPasswordStrength(): { strength: string, color: string, width: string } {
    const password = this.changePasswordForm.get('newPassword')?.value || '';
    
    if (password.length === 0) {
      return { strength: '', color: '', width: '0%' };
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[#?!@$%^&*-]/.test(password)) score++;

    switch (score) {
      case 1:
      case 2:
        return { strength: 'Weak', color: '#f44336', width: '25%' };
      case 3:
        return { strength: 'Fair', color: '#ff9800', width: '50%' };
      case 4:
        return { strength: 'Good', color: '#2196f3', width: '75%' };
      case 5:
        return { strength: 'Strong', color: '#4caf50', width: '100%' };
      default:
        return { strength: 'Very Weak', color: '#f44336', width: '10%' };
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.changePasswordForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
    }
    
    if (fieldName === 'newPassword') {
      if (field?.hasError('minlength')) {
        return 'Password must be at least 8 characters';
      }
      if (field?.hasError('passwordStrength')) {
        return 'Password must contain uppercase, lowercase, number and special character';
      }
    }
    
    if (fieldName === 'confirmPassword' && this.changePasswordForm.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }
    
    return '';
  }
}
