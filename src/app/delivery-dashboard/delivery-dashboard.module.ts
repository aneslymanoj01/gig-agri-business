import { NgModule } from '@angular/core';
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

import { DeliveryDashboardComponent } from './delivery-dashboard.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ViewAssignedOrdersComponent } from './manage-orders/view-assigned-orders/view-assigned-orders.component';
import { DeliveryChangePasswordComponent } from './change-password/delivery-change-password.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryDashboardComponent,
    children: [
      { path: '', redirectTo: 'manage-orders', pathMatch: 'full' },
      { path: 'manage-orders', component: ManageOrdersComponent },
      { path: 'manage-orders/view-assigned', component: ViewAssignedOrdersComponent },
      { path: 'change-password', component: DeliveryChangePasswordComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DeliveryDashboardComponent,
    ManageOrdersComponent,
    ViewAssignedOrdersComponent,
    DeliveryChangePasswordComponent
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
export class DeliveryDashboardModule { }
