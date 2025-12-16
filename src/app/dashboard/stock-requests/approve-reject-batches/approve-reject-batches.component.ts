import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StockRequestService } from '../../../shared/services/stock-request.service';
import { NotificationService } from '../../../shared/services/notification.service';

export interface RequestBatchItem {
  productId: number;
  productName: string;
  quantity: number;
}

export interface RequestBatch {
  id: string;
  distributorId: number;
  priority: string;
  notes: string;
  items: RequestBatchItem[];
  status: string;
  requestedAt: string;
  processedAt: string | null;
  processedBy: string | null;
  rejectionReason: string | null;
}

@Component({
  selector: 'app-approve-reject-batches',
  templateUrl: './approve-reject-batches.component.html',
  styleUrls: ['./approve-reject-batches.component.scss']
})
export class ApproveRejectBatchesComponent {
  batchId: string = '';
  selectedBatch: RequestBatch | null = null;
  isSearching = false;
  isProcessing = false;
  showRemarksDialog = false;
  actionType: 'APPROVE' | 'REJECT' = 'APPROVE';
  remarks = '';

  constructor(
    private stockRequestService: StockRequestService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onSearchBatch(): void {
    if (!this.batchId.trim()) {
      this.notificationService.showError('Please enter a batch ID');
      return;
    }

    this.isSearching = true;
    this.selectedBatch = null;

    const searchParams = {
      id: this.batchId.trim()
    };

    this.stockRequestService.searchRequestBatches(searchParams).subscribe({
      next: (response) => {
        if (response.data.content.length > 0) {
          this.selectedBatch = response.data.content[0];
        } else {
          this.notificationService.showError('Batch not found');
        }
        this.isSearching = false;
      },
      error: (error) => {
        this.notificationService.showError('Batch not found');
        this.isSearching = false;
      }
    });
  }

  openApproveDialog(): void {
    this.actionType = 'APPROVE';
    this.remarks = '';
    this.showRemarksDialog = true;
  }

  openRejectDialog(): void {
    this.actionType = 'REJECT';
    this.remarks = '';
    this.showRemarksDialog = true;
  }

  closeRemarksDialog(): void {
    this.showRemarksDialog = false;
    this.remarks = '';
  }

  processBatch(): void {
    if (!this.remarks.trim() || !this.selectedBatch) {
      return;
    }

    this.isProcessing = true;

    const requestData = {
      action: this.actionType,
      remarks: this.remarks.trim()
    };

    this.stockRequestService.processBatch(this.selectedBatch.id, requestData).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          this.notificationService.showSuccess(
            `Batch ${this.actionType.toLowerCase()}d successfully!`
          );
          this.selectedBatch = response.data;
          this.closeRemarksDialog();
        } else {
          this.notificationService.showError(
            response.resultDescription || `Failed to ${this.actionType.toLowerCase()} batch`
          );
        }
        this.isProcessing = false;
      },
      error: (error) => {
        this.notificationService.showError(
          `Failed to ${this.actionType.toLowerCase()} batch. Please try again.`
        );
        this.isProcessing = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/stock-requests']);
  }
}
