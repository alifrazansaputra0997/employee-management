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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LoadingService } from '@services/common/loading-service/loading-service';
import { status } from '@config/interfaces/status.interface';
@Component({
  selector: 'app-form-employee',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    NgxMatSelectSearchModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form-employee.html',
  styleUrl: './form-employee.css',
})
export class FormEmployee implements OnInit {
  label = Label;
  formEmployee!: FormGroup;
  submitted: boolean = false;

  readonly maxDate = new Date();

  filteredGroup: group[] = [];
  DDLGroup: group[] = [];
  searchGroup = new FormControl('');

  DDLStatus: status[] = [];

  constructor(
    private loadingService: LoadingService,
    private userService: Users,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initDDLGroup();
    this.initDDLStatus();

    this.searchGroup.valueChanges.subscribe(value => {
      this.filterGroup(value);
    });
  }

  initForm() {
    this.formEmployee = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthDate: new FormControl('', [Validators.required]),
      basicSalary: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  onSave() {
    this.submitted = true;
    if (this.formEmployee.invalid) {
      this.formEmployee.markAllAsTouched();
      this.formEmployee.markAllAsDirty();
    } else {
      
    }
  }

  onCancel() {

  }

  filterGroup(value: string | null) {
    const keyword = (value ?? '').toLowerCase().trim();
    this.filteredGroup = this.DDLGroup.filter(group =>
      group.group.toLowerCase().includes(keyword)
    );
  }

  initDDLGroup() {
    this.loadingService.setLoading(true);
    this.userService.getGroup().subscribe(res => {
      if (res.data) {
        this.DDLGroup = res.data;
        this.filteredGroup = [...this.DDLGroup];
        this.loadingService.setLoading(false);
      }
    })
  }

  initDDLStatus() {
    this.loadingService.setLoading(true);
     this.userService.getStatus().subscribe(res => {
      if (res.data) {
        this.DDLStatus = res.data;
        this.loadingService.setLoading(false);
      }
    })
  }
}
