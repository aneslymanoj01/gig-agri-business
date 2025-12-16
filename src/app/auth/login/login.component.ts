import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';
import { UserRole } from '../../shared/models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Redirect if already authenticated
    if (this.authService.hasValidToken()) {
      this.redirectBasedOnRole();
      return;
    }

    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
    // Force clear any cached values
    setTimeout(() => {
      this.loginForm.patchValue({
        userName: '',
        password: ''
      });
    }, 100);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login response:', response);
        
        if (response.errorCode === 0) {
          this.notificationService.showSuccess('Login successful!');
          
          if (response.tokenResponse?.isPasswordChangeRequired === true) {
            this.router.navigate(['/change-password']);
          } else {
            // Get user role from token response for immediate redirection
            const payload = this.authService.decodeToken(response.tokenResponse?.accessToken);
            this.redirectBasedOnRole(payload);
          }
        } else {
          console.log('Login failed with errorCode:', response.errorCode);
          const errorMsg = response.errorMessage || response.errorDescription || 'Login failed';
          this.notificationService.showError(errorMsg);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        
        // Try to get error description from response body first
        let errorMessage = 'Login failed. Please try again.';
        if (error.error?.errorDescription) {
          errorMessage = error.error.errorDescription;
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.notificationService.showError(errorMessage);
      }
    });
  }

  private redirectBasedOnRole(userPayload?: any): void {
    const user = userPayload || this.authService.getCurrentUser();
    
    if (user?.role === UserRole.DISTRIBUTOR) {
      this.router.navigate(['/distributor-dashboard']);
    } else if (user?.role === UserRole.DEALER) {
      this.router.navigate(['/dealer-dashboard']);
    } else if (user?.role === UserRole.DELIVERY) {
      this.router.navigate(['/delivery-dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName === 'userName' ? 'Username' : 'Password'} is required`;
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `${fieldName === 'userName' ? 'Username' : 'Password'} must be at least ${minLength} characters`;
    }
    return '';
  }
}
