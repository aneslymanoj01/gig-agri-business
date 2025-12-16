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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DistributorDashboardComponent } from './distributor-dashboard.component';
import { DealersComponent } from './dealers/dealers.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AddDealerComponent } from './dealers/add-dealer/add-dealer.component';
import { SearchDealerComponent } from './dealers/search-dealer/search-dealer.component';
import { UpdateDealerComponent } from './dealers/update-dealer/update-dealer.component';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';
import { CreatePurchaseOrderComponent } from './purchase-orders/create-purchase-order/create-purchase-order.component';
import { ViewPurchaseOrdersComponent } from './purchase-orders/view-purchase-orders/view-purchase-orders.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ViewOrdersComponent } from './manage-orders/view-orders/view-orders.component';
import { ApproveRejectOrdersComponent } from './manage-orders/approve-reject-orders/approve-reject-orders.component';
import { AssignDeliveryComponent } from './manage-orders/assign-delivery/assign-delivery.component';
import { TrackOrdersComponent } from './track-orders/track-orders.component';

@Component({
  selector: 'app-order-status',
  template: `<div class="page-header"><h1><mat-icon>track_changes</mat-icon> Order Status</h1></div>
             <div class="coming-soon-message"><mat-icon>construction</mat-icon><h3>Coming Soon</h3></div>`,
  styles: [`
    .page-header h1 { display: flex; align-items: center; gap: 12px; color: #2E7D32; margin: 0 0 8px 0; mat-icon { font-size: 32px; } }
    .coming-soon-message { text-align: center; padding: 60px 20px; mat-icon { font-size: 64px; color: #ccc; margin-bottom: 16px; } h3 { color: #333; margin: 0; } }
  `]
})
export class OrderStatusComponent { }

@Component({
  selector: 'app-approve-orders',
  template: `<div class="page-header"><h1><mat-icon>check_circle</mat-icon> Approve/Reject Orders</h1></div>
             <div class="coming-soon-message"><mat-icon>construction</mat-icon><h3>Coming Soon</h3></div>`,
  styles: [`
    .page-header h1 { display: flex; align-items: center; gap: 12px; color: #2E7D32; margin: 0 0 8px 0; mat-icon { font-size: 32px; } }
    .coming-soon-message { text-align: center; padding: 60px 20px; mat-icon { font-size: 64px; color: #ccc; margin-bottom: 16px; } h3 { color: #333; margin: 0; } }
  `]
})
export class ApproveOrdersComponent { }

@Component({
  selector: 'app-distributor-change-password',
  template: `<div class="page-header"><h1><mat-icon>lock</mat-icon> Change Password</h1></div>
             <div class="coming-soon-message"><mat-icon>construction</mat-icon><h3>Coming Soon</h3></div>`,
  styles: [`
    .page-header h1 { display: flex; align-items: center; gap: 12px; color: #2E7D32; margin: 0 0 8px 0; mat-icon { font-size: 32px; } }
    .coming-soon-message { text-align: center; padding: 60px 20px; mat-icon { font-size: 64px; color: #ccc; margin-bottom: 16px; } h3 { color: #333; margin: 0; } }
  `]
})
export class DistributorChangePasswordComponent { }

const routes: Routes = [
  {
    path: '',
    component: DistributorDashboardComponent,
    children: [
      { path: '', redirectTo: 'dealers', pathMatch: 'full' },
      { path: 'dealers', component: DealersComponent },
      { path: 'dealers/add', component: AddDealerComponent },
      { path: 'dealers/search', component: SearchDealerComponent },
      { path: 'dealers/update', component: UpdateDealerComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'purchase-orders', component: PurchaseOrdersComponent },
      { path: 'purchase-orders/create', component: CreatePurchaseOrderComponent },
      { path: 'purchase-orders/view', component: ViewPurchaseOrdersComponent },
      { path: 'manage-orders', component: ManageOrdersComponent },
      { path: 'manage-orders/view', component: ViewOrdersComponent },
      { path: 'manage-orders/assign-delivery', component: AssignDeliveryComponent },
      { path: 'manage-orders/approve-reject', component: ApproveRejectOrdersComponent },
      { path: 'manage-orders/trace', component: TrackOrdersComponent },
      { path: 'change-password', component: DistributorChangePasswordComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DistributorDashboardComponent,
    DealersComponent,
    AddDealerComponent,
    SearchDealerComponent,
    UpdateDealerComponent,
    InventoryComponent,
    PurchaseOrdersComponent,
    CreatePurchaseOrderComponent,
    ViewPurchaseOrdersComponent,
    ManageOrdersComponent,
    ViewOrdersComponent,
    ApproveRejectOrdersComponent,
    AssignDeliveryComponent,
    TrackOrdersComponent,
    OrderStatusComponent,
    ApproveOrdersComponent,
    DistributorChangePasswordComponent
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
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class DistributorDashboardModule { }
