import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotificationDialogData } from '@config/interfaces/common-notification.interface';
import { MatAnchor } from "@angular/material/button";
import { Label } from '@config/Labels';

@Component({
  selector: 'app-common-notification',
  imports: [
    MatDialogModule,
    MatAnchor
],
  templateUrl: './common-notification.html',
  styleUrl: './common-notification.css',
})
export class CommonNotification {
  label = Label;
  readonly data = inject<NotificationDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef)

  onClose(){
    this.dialogRef.close();
  }
}
