import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryTeamService } from '../../../shared/services/delivery-team.service';
import { NotificationService } from '../../../shared/services/notification.service';

export interface DeliveryTeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  licenseNumber: string;
  vehicleNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  status: string;
}

@Component({
  selector: 'app-update-delivery-team',
  templateUrl: './update-delivery-team.component.html',
  styleUrls: ['./update-delivery-team.component.scss']
})
export class UpdateDeliveryTeamComponent implements OnInit {
  teamMemberId: number | null = null;
  selectedTeamMember: DeliveryTeamMember | null = null;
  updateForm!: FormGroup;
  isSearching = false;
  isUpdating = false;

  constructor(
    private fb: FormBuilder,
    private deliveryTeamService: DeliveryTeamService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.updateForm = this.fb.group({
      phone: ['', [Validators.required]],
      vehicleType: ['', [Validators.required]],
      licenseNumber: [''],
      vehicleNumber: [''],
      streetAddress: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      country: ['']
    });
  }

  onSearchTeamMember(): void {
    if (!this.teamMemberId) {
      this.notificationService.showError('Please enter a team member ID');
      return;
    }

    this.isSearching = true;
    this.selectedTeamMember = null;

    this.deliveryTeamService.getTeamMemberById(this.teamMemberId).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          this.selectedTeamMember = response.data;
          this.updateForm.patchValue({
            phone: this.selectedTeamMember.phone,
            vehicleType: this.selectedTeamMember.vehicleType,
            licenseNumber: this.selectedTeamMember.licenseNumber,
            vehicleNumber: this.selectedTeamMember.vehicleNumber,
            streetAddress: this.selectedTeamMember.streetAddress,
            city: this.selectedTeamMember.city,
            state: this.selectedTeamMember.state,
            postalCode: this.selectedTeamMember.postalCode,
            country: this.selectedTeamMember.country
          });
        } else {
          this.notificationService.showError(response.resultDescription || 'Team member not found');
        }
        this.isSearching = false;
      },
      error: (error) => {
        this.notificationService.showError('Team member not found');
        this.isSearching = false;
      }
    });
  }

  onUpdateTeamMember(): void {
    if (this.updateForm.valid && this.selectedTeamMember) {
      this.isUpdating = true;

      const updateData = {
        name: this.selectedTeamMember.name,
        userName: this.selectedTeamMember.email.split('@')[0], // Extract username from email
        email: this.selectedTeamMember.email,
        phone: this.updateForm.value.phone,
        vehicleType: this.updateForm.value.vehicleType,
        licenseNumber: this.updateForm.value.licenseNumber || '',
        vehicleNumber: this.updateForm.value.vehicleNumber || '',
        streetAddress: this.updateForm.value.streetAddress || '',
        city: this.updateForm.value.city || '',
        state: this.updateForm.value.state || '',
        postalCode: this.updateForm.value.postalCode || '',
        country: this.updateForm.value.country || ''
      };

      this.deliveryTeamService.updateTeamMember(this.selectedTeamMember.id, updateData).subscribe({
        next: (response) => {
          if (response.resultCode === 0) {
            this.notificationService.showSuccess('Team member updated successfully!');
            this.onClear();
          } else {
            this.notificationService.showError(response.resultDescription || 'Failed to update team member');
          }
          this.isUpdating = false;
        },
        error: (error) => {
          this.notificationService.showError('Failed to update team member. Please try again.');
          this.isUpdating = false;
        }
      });
    }
  }

  onClear(): void {
    this.selectedTeamMember = null;
    this.teamMemberId = null;
    this.updateForm.reset();
  }
}
