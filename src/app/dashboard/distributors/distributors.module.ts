import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DistributorsComponent } from './distributors.component';
import { AddDistributorComponent } from './add-distributor/add-distributor.component';
import { UpdateDistributorComponent } from './update-distributor/update-distributor.component';
import { SearchDistributorComponent } from './search-distributor/search-distributor.component';

const routes: Routes = [
  { path: '', component: DistributorsComponent },
  { path: 'add', component: AddDistributorComponent },
  { path: 'update/:id', component: UpdateDistributorComponent },
  { path: 'search', component: SearchDistributorComponent }
];

@NgModule({
  declarations: [
    DistributorsComponent,
    AddDistributorComponent,
    UpdateDistributorComponent,
    SearchDistributorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class DistributorsModule { }
