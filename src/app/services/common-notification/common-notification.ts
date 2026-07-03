import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { CommonNotification } from '@components/common-notification/common-notification';
import { Label } from '@config/Labels';

@Injectable({
  providedIn: 'root',
})
export class CommonNotificationService {
  label = Label;
  private readonly dialog = inject(MatDialog);


  constructor() { }

  showInformation(msg: string) {
    return this.dialog.open(CommonNotification, {
      data: {
        title: this.label.LABELS.NOTIFICATIONS,
        message: msg
      },
      panelClass: 'square-dialog'
    }).afterClosed();
  }
}
