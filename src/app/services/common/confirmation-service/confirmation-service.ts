import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Label } from '@config/Labels';
import { DialogConfirmation } from '@components/dialog-confirmation/dialog-confirmation';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  label = Label;
  private readonly dialog = inject(MatDialog);

  constructor() { }

  confirmation(msg: string) {
    return this.dialog.open(DialogConfirmation, {
      data: {
        title: this.label.LABELS.CONFIRMATION,
        message: msg
      },
      panelClass: 'square-dialog'
    })
  }
}
