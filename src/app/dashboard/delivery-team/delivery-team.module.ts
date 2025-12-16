import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DeliveryTeamComponent } from './delivery-team.component';
import { AddDeliveryTeamComponent } from './add-delivery-team/add-delivery-team.component';
import { SearchDeliveryTeamComponent } from './search-delivery-team/search-delivery-team.component';
import { UpdateDeliveryTeamComponent } from './update-delivery-team/update-delivery-team.component';

const routes: Routes = [
  { path: '', component: DeliveryTeamComponent },
  { path: 'add', component: AddDeliveryTeamComponent },
  { path: 'search', component: SearchDeliveryTeamComponent },
  { path: 'update', component: UpdateDeliveryTeamComponent }
];

@NgModule({
  declarations: [
    DeliveryTeamComponent,
    AddDeliveryTeamComponent,
    SearchDeliveryTeamComponent,
    UpdateDeliveryTeamComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class DeliveryTeamModule { }
