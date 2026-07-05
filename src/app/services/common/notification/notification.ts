import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakebarNotification } from '@components/snakebar-notification/snakebar-notification';
import { Label } from '@config/Labels';

@Injectable({
  providedIn: 'root',
})
export class Notification {
  label = Label;
  snakeBarService = inject(MatSnackBar);

  successDelete(row: any) {
    this.snakeBarService.openFromComponent(SnakebarNotification, {
      duration: 5 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['delete-snackbar'],
      data: {
        message: `${row.id} - ${row.firstName} ${row.lastName} ${this.label.LABELS.SUCCESFULLY_DELETE}`
      }
    });
  }

  successCreate(data: any) {
    this.snakeBarService.openFromComponent(SnakebarNotification, {
      duration: 5 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
      data: {
        message: `${data.firstName} ${this.label.LABELS.SUCCESFULLY_CREATED}`
      }
    });
  }
}
