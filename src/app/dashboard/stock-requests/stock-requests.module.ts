import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { StockRequestsComponent } from './stock-requests.component';
import { SearchRequestBatchesComponent } from './search-request-batches/search-request-batches.component';
import { ApproveRejectBatchesComponent } from './approve-reject-batches/approve-reject-batches.component';

const routes: Routes = [
  { path: '', component: StockRequestsComponent },
  { path: 'search-batches', component: SearchRequestBatchesComponent },
  { path: 'approve-reject', component: ApproveRejectBatchesComponent }
];

@NgModule({
  declarations: [
    StockRequestsComponent,
    SearchRequestBatchesComponent,
    ApproveRejectBatchesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class StockRequestsModule { }
