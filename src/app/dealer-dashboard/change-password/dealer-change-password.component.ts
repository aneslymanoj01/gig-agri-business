import { Component } from '@angular/core';

@Component({
  selector: 'app-dealer-change-password',
  template: `
    <div class="change-password-page">
      <div class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span class="breadcrumb-item">Dashboard</span>
            <mat-icon class="breadcrumb-separator">chevron_right</mat-icon>
            <span class="breadcrumb-item active">Change Password</span>
          </div>
          <h1 class="page-title">
            <mat-icon class="title-icon">lock</mat-icon>
            Change Password
          </h1>
        </div>
      </div>
      <div class="content-container">
        <div class="coming-soon-message">
          <mat-icon>construction</mat-icon>
          <h3>Coming Soon</h3>
          <p>This feature will be available soon</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .change-password-page { width: 100%; max-width: 100%; box-sizing: border-box; }
    .page-header { background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%); margin: -24px -24px 24px -24px; padding: 20px 24px; color: white; position: relative; width: calc(100% + 48px); box-sizing: border-box; }
    .header-content { max-width: 1200px; margin: 0 auto; width: 100%; box-sizing: border-box; padding: 0 20px; }
    .breadcrumb { display: flex; align-items: center; margin-bottom: 8px; font-size: 12px; opacity: 0.9; }
    .breadcrumb-item { color: white; }
    .breadcrumb-item.active { font-weight: 500; }
    .breadcrumb-separator { font-size: 14px; margin: 0 6px; opacity: 0.7; }
    .page-title { display: flex; align-items: center; font-size: 24px; font-weight: 600; margin: 0 0 4px 0; color: white; }
    .title-icon { margin-right: 8px; font-size: 28px; }
    .content-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .coming-soon-message { text-align: center; padding: 60px 20px; }
    .coming-soon-message mat-icon { font-size: 64px; color: #ccc; margin-bottom: 16px; }
    .coming-soon-message h3 { color: #333; margin: 0 0 8px 0; }
    .coming-soon-message p { color: #666; margin: 0; }
  `]
})
export class DealerChangePasswordComponent { }
