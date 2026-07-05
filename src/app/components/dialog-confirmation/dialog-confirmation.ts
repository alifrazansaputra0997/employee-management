import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotificationDialogData } from '@config/interfaces/common-notification.interface';
import { MatAnchor } from "@angular/material/button";
import { Label } from '@config/Labels';

@Component({
  selector: 'app-dialog-confirmation',
  imports: [
    MatDialogModule,
    MatAnchor
  ],
  templateUrl: './dialog-confirmation.html',
  styleUrl: './dialog-confirmation.css',
})
export class DialogConfirmation {
  label = Label;
  readonly data = inject<NotificationDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef)

  onClose() {
    this.dialogRef.close();
  }

  onYes() {
    this.dialogRef.close({
      response: 'yes'
    });
  }
}
