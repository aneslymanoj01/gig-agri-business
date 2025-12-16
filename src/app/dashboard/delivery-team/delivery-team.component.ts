import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-team',
  template: `
    <div class="page-header">
      <h1><mat-icon>local_shipping</mat-icon> Delivery Team Management</h1>
      <p>Manage your delivery team and logistics</p>
    </div>

    <div class="action-cards">
      <mat-card class="action-card clickable" (click)="navigateToAddTeamMember()">
        <mat-card-content>
          <mat-icon>person_add</mat-icon>
          <h3>Create Delivery Team</h3>
          <p>Add new delivery personnel</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="action-card clickable" (click)="navigateToUpdateTeamMember()">
        <mat-card-content>
          <mat-icon>edit</mat-icon>
          <h3>Update Team Member</h3>
          <p>Modify delivery team information</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="action-card clickable" (click)="navigateToSearchTeamMembers()">
        <mat-card-content>
          <mat-icon>search</mat-icon>
          <h3>Search Team Members</h3>
          <p>Find and manage delivery personnel</p>
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
export class DeliveryTeamComponent {
  constructor(private router: Router) {}

  navigateToAddTeamMember(): void {
    this.router.navigate(['/dashboard/delivery-team/add']);
  }

  navigateToUpdateTeamMember(): void {
    this.router.navigate(['/dashboard/delivery-team/update']);
  }

  navigateToSearchTeamMembers(): void {
    this.router.navigate(['/dashboard/delivery-team/search']);
  }
}
