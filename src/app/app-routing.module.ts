import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardChangePasswordComponent } from './dashboard/change-password/dashboard-change-password.component';
import { DistributorDashboardComponent } from './distributor-dashboard/distributor-dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'distributors', pathMatch: 'full' },
      { path: 'change-password', component: DashboardChangePasswordComponent },
      { 
        path: 'distributors', 
        loadChildren: () => import('./dashboard/distributors/distributors.module').then(m => m.DistributorsModule)
      },
      { 
        path: 'products', 
        loadChildren: () => import('./dashboard/products/products.module').then(m => m.ProductsModule)
      },
      { 
        path: 'delivery-team', 
        loadChildren: () => import('./dashboard/delivery-team/delivery-team.module').then(m => m.DeliveryTeamModule)
      },
      { 
        path: 'stock-requests', 
        loadChildren: () => import('./dashboard/stock-requests/stock-requests.module').then(m => m.StockRequestsModule)
      }
    ]
  },
  { 
    path: 'distributor-dashboard', 
    loadChildren: () => import('./distributor-dashboard/distributor-dashboard.module').then(m => m.DistributorDashboardModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'dealer-dashboard', 
    loadChildren: () => import('./dealer-dashboard/dealer-dashboard.module').then(m => m.DealerDashboardModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'delivery-dashboard', 
    loadChildren: () => import('./delivery-dashboard/delivery-dashboard.module').then(m => m.DeliveryDashboardModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
