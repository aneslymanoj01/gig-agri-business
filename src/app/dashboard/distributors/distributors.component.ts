import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distributors',
  template: `
    <div class="page-header">
      <h1><mat-icon>people</mat-icon> Distributor Management</h1>
      <p>Manage your distributor network and partnerships</p>
    </div>

    <div class="action-cards">
      <mat-card class="action-card" (click)="navigate('add')">
        <mat-card-content>
          <mat-icon>person_add</mat-icon>
          <h3>Add Distributor</h3>
          <p>Register new distributors to expand your network</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="action-card" (click)="navigate('search')">
        <mat-card-content>
          <mat-icon>search</mat-icon>
          <h3>Search Distributors</h3>
          <p>Find and manage existing distributors</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="action-card" (click)="navigate('update/1')">
        <mat-card-content>
          <mat-icon>edit</mat-icon>
          <h3>Update Distributor</h3>
          <p>Modify distributor information and settings</p>
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
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
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
export class DistributorsComponent {
  constructor(private router: Router) {}

  navigate(path: string): void {
    this.router.navigate(['/dashboard/distributors', path]);
  }
}
