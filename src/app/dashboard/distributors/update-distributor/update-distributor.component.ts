import { Component } from '@angular/core';

@Component({
  selector: 'app-update-distributor',
  template: `
    <div class="page-header">
      <h1><mat-icon>edit</mat-icon> Update Distributor</h1>
      <p>Modify distributor information and settings</p>
    </div>

    <mat-card class="placeholder-card">
      <mat-card-content>
        <div class="placeholder-content">
          <mat-icon>construction</mat-icon>
          <h2>Coming Soon</h2>
          <p>Update distributor functionality will be implemented in the next phase.</p>
          <button mat-raised-button color="primary" routerLink="/dashboard/distributors">
            <mat-icon>arrow_back</mat-icon>
            Back to Distributors
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .page-header {
      margin-bottom: 32px;
      h1 {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #2E7D32;
        margin: 0 0 8px 0;
        mat-icon { font-size: 32px; width: 32px; height: 32px; }
      }
      p { color: #666; margin: 0; }
    }
    .placeholder-card {
      max-width: 600px;
      margin: 0 auto;
    }
    .placeholder-content {
      text-align: center;
      padding: 48px 24px;
      mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #FF9800;
        margin-bottom: 24px;
      }
      h2 { color: #333; margin: 0 0 16px 0; }
      p { color: #666; margin: 0 0 32px 0; }
    }
  `]
})
export class UpdateDistributorComponent { }
