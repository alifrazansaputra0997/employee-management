import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Label } from '@config/Labels';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-modal-employee',
  imports: [
    MatDialogModule,
    MatTabsModule,
    MatIconModule
  ],
  templateUrl: './modal-employee.html',
  styleUrl: './modal-employee.css',
})
export class ModalEmployee {
  label = Label;
  readonly data = inject<any>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef)


}
