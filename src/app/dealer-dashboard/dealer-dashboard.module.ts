import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

import { DealerDashboardComponent } from './dealer-dashboard.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { DealerChangePasswordComponent } from './change-password/dealer-change-password.component';
import { NewOrderComponent } from './manage-orders/new-order/new-order.component';
import { ViewOrdersComponent } from './manage-orders/view-orders/view-orders.component';
import { TrackOrdersComponent } from './manage-orders/track-orders/track-orders.component';

@Component({
  selector: 'app-new-order-placeholder',
  template: `
    <div class="new-order-page">
      <div class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span class="breadcrumb-item">Dashboard</span>
            <mat-icon class="breadcrumb-separator">chevron_right</mat-icon>
            <span class="breadcrumb-item" (click)="goBack()">Manage Orders</span>
            <mat-icon class="breadcrumb-separator">chevron_right</mat-icon>
            <span class="breadcrumb-item active">New Order</span>
          </div>
          <h1 class="page-title">
            <mat-icon class="title-icon">add_shopping_cart</mat-icon>
            New Order
          </h1>
        </div>
      </div>
      <div class="content-container">
        <div class="coming-soon-message">
          <mat-icon>construction</mat-icon>
          <h3>Coming Soon</h3>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .new-order-page { width: 100%; max-width: 100%; box-sizing: border-box; }
    .page-header { background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%); margin: -24px -24px 24px -24px; padding: 20px 24px; color: white; position: relative; width: calc(100% + 48px); box-sizing: border-box; }
    .header-content { max-width: 1200px; margin: 0 auto; width: 100%; box-sizing: border-box; padding: 0 20px; }
    .breadcrumb { display: flex; align-items: center; margin-bottom: 8px; font-size: 12px; opacity: 0.9; }
    .breadcrumb-item { color: white; cursor: pointer; }
    .breadcrumb-item.active { font-weight: 500; }
    .breadcrumb-separator { font-size: 14px; margin: 0 6px; opacity: 0.7; }
    .page-title { display: flex; align-items: center; font-size: 24px; font-weight: 600; margin: 0 0 4px 0; color: white; }
    .title-icon { margin-right: 8px; font-size: 28px; }
    .content-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .coming-soon-message { text-align: center; padding: 60px 20px; }
    .coming-soon-message mat-icon { font-size: 64px; color: #ccc; margin-bottom: 16px; }
    .coming-soon-message h3 { color: #333; margin: 0; }
  `]
})
export class NewOrderPlaceholderComponent {
  constructor(private router: Router) {}
  goBack() { this.router.navigate(['/dealer-dashboard/manage-orders']); }
}

@Component({
  selector: 'app-view-orders-placeholder',
  template: `
    <div class="view-orders-page">
      <div class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span class="breadcrumb-item">Dashboard</span>
            <mat-icon class="breadcrumb-separator">chevron_right</mat-icon>
            <span class="breadcrumb-item" (click)="goBack()">Manage Orders</span>
            <mat-icon class="breadcrumb-separator">chevron_right</mat-icon>
            <span class="breadcrumb-item active">View Orders</span>
          </div>
          <h1 class="page-title">
            <mat-icon class="title-icon">list_alt</mat-icon>
            View Orders
          </h1>
        </div>
      </div>
      <div class="content-container">
        <div class="coming-soon-message">
          <mat-icon>construction</mat-icon>
          <h3>Coming Soon</h3>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .view-orders-page { width: 100%; max-width: 100%; box-sizing: border-box; }
    .page-header { background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%); margin: -24px -24px 24px -24px; padding: 20px 24px; color: white; position: relative; width: calc(100% + 48px); box-sizing: border-box; }
    .header-content { max-width: 1200px; margin: 0 auto; width: 100%; box-sizing: border-box; padding: 0 20px; }
    .breadcrumb { display: flex; align-items: center; margin-bottom: 8px; font-size: 12px; opacity: 0.9; }
    .breadcrumb-item { color: white; cursor: pointer; }
    .breadcrumb-item.active { font-weight: 500; }
    .breadcrumb-separator { font-size: 14px; margin: 0 6px; opacity: 0.7; }
    .page-title { display: flex; align-items: center; font-size: 24px; font-weight: 600; margin: 0 0 4px 0; color: white; }
    .title-icon { margin-right: 8px; font-size: 28px; }
    .content-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .coming-soon-message { text-align: center; padding: 60px 20px; }
    .coming-soon-message mat-icon { font-size: 64px; color: #ccc; margin-bottom: 16px; }
    .coming-soon-message h3 { color: #333; margin: 0; }
  `]
})
export class ViewOrdersPlaceholderComponent {
  constructor(private router: Router) {}
  goBack() { this.router.navigate(['/dealer-dashboard/manage-orders']); }
}

const routes: Routes = [
  {
    path: '',
    component: DealerDashboardComponent,
    children: [
      { path: '', redirectTo: 'manage-orders', pathMatch: 'full' },
      { path: 'manage-orders', component: ManageOrdersComponent },
      { path: 'manage-orders/new', component: NewOrderComponent },
      { path: 'manage-orders/view', component: ViewOrdersComponent },
      { path: 'manage-orders/track', component: TrackOrdersComponent },
      { path: 'change-password', component: DealerChangePasswordComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DealerDashboardComponent,
    ManageOrdersComponent,
    DealerChangePasswordComponent,
    NewOrderComponent,
    ViewOrdersComponent,
    TrackOrdersComponent,
    NewOrderPlaceholderComponent,
    ViewOrdersPlaceholderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ]
})
export class DealerDashboardModule { }
