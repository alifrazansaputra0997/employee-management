import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Users } from '@services/users/users';
import { group } from '@config/interfaces/group.interface';
import { CommonNotificationService } from '@services/common/common-notification/common-notification';
import { Label } from '@config/Labels';
import { formSearchPayload } from '@config/interfaces/employee-list.interface';

@Component({
  selector: 'app-form-employee',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './form-employee.html',
  styleUrl: './form-employee.css',
})
export class FormEmployee implements OnInit {
  formEmployee!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formEmployee = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      basicSalary: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  onSave() {

  }

  onCancel() {

  }
}
