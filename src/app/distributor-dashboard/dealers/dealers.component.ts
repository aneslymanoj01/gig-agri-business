import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealers',
  template: `
    <div class="page-header">
      <h1><mat-icon>people</mat-icon> Dealer Management</h1>
      <p>Manage your dealer network</p>
    </div>

    <div class="action-cards">
      <mat-card class="action-card" (click)="navigateToAddDealer()">
        <mat-card-content>
          <mat-icon>person_add</mat-icon>
          <h3>Create Dealer</h3>
          <p>Add new dealers to your network</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="action-card" (click)="navigateToSearchDealers()">
        <mat-card-content>
          <mat-icon>search</mat-icon>
          <h3>Search Dealers</h3>
          <p>Find and manage existing dealers</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="action-card" (click)="navigateToUpdateDealer()">
        <mat-card-content>
          <mat-icon>edit</mat-icon>
          <h3>Update Dealer</h3>
          <p>Modify dealer information</p>
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
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
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
      .coming-soon {
        position: absolute;
        top: 16px;
        right: 16px;
        background: #FF9800;
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 500;
      }
    }
  `]
})
export class DealersComponent {
  constructor(private router: Router) {}

  navigateToAddDealer(): void {
    this.router.navigate(['/distributor-dashboard/dealers/add']);
  }

  navigateToSearchDealers(): void {
    this.router.navigate(['/distributor-dashboard/dealers/search']);
  }

  navigateToUpdateDealer(): void {
    this.router.navigate(['/distributor-dashboard/dealers/update']);
  }
}
