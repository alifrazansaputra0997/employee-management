import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Label } from '@config/Labels';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { employee } from '@config/interfaces/employee.interface';
import { UpperCasePipe, TitleCasePipe, CurrencyPipe, DatePipe} from '@angular/common';
@Component({
  selector: 'app-modal-employee',
  imports: [
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    UpperCasePipe,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './modal-employee.html',
  styleUrl: './modal-employee.css',
})
export class ModalEmployee implements OnInit {
  label = Label;
  readonly data = inject<employee>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef)
  employeeData!: employee;
  shortName: string = '';
  name: string = '';

  constructor() { }

  ngOnInit(): void {
    this.employeeData = this.data;
    this.shortName = `${this.employeeData.firstName.charAt(0)}${this.employeeData.lastName.charAt(0)}`;
    this.name = `${this.employeeData.firstName} ${this.employeeData.lastName}`;
  }
}
