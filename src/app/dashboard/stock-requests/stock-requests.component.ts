import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-requests',
  template: `
    <div class="page-header">
      <h1><mat-icon>assignment</mat-icon> Stock Requests Management</h1>
      <p>Review and manage distributor stock requests</p>
    </div>

    <div class="action-cards">
      <mat-card class="action-card clickable" (click)="navigateToSearchBatches()">
        <mat-card-content>
          <mat-icon>search</mat-icon>
          <h3>Search Request Batches</h3>
          <p>Find and view stock request batches</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="action-card clickable" (click)="navigateToApproveReject()">
        <mat-card-content>
          <mat-icon>check_circle</mat-icon>
          <h3>Approve/Reject Requests</h3>
          <p>Review and process pending stock requests</p>
        </mat-card-content>
      </mat-card>
    </div>
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
    .action-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }
    .action-card {
      position: relative;
      &.clickable {
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      }
      mat-card-content {
        text-align: center;
        padding: 32px 24px;
        mat-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
          color: #4CAF50;
          margin-bottom: 16px;
        }
        h3 { color: #333; margin: 0 0 8px 0; }
        p { color: #666; margin: 0; }
      }
    }
  `]
})
export class StockRequestsComponent {
  constructor(private router: Router) {}

  navigateToSearchBatches(): void {
    this.router.navigate(['/dashboard/stock-requests/search-batches']);
  }

  navigateToApproveReject(): void {
    this.router.navigate(['/dashboard/stock-requests/approve-reject']);
  }
}
