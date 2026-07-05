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
import { ActivatedRoute } from '@angular/router';
import { Label } from '@config/Labels';
import { formSearchPayload } from '@config/interfaces/employee-list.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LoadingService } from '@services/common/loading-service/loading-service';
import { status } from '@config/interfaces/status.interface';
import { Router } from '@angular/router';
import { employee } from '@config/interfaces/employee.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from '@services/common/notification/notification';
import { CommonNotification } from '@components/common-notification/common-notification';
import { CommonNotificationService } from '@services/common/common-notification/common-notification';
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
  isEdit: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private userService: Users,
    private router: Router,
    private notification: Notification,
    private activeRoute: ActivatedRoute,
    private commonNotif: CommonNotificationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initDDLGroup();
    this.initDDLStatus();

    this.searchGroup.valueChanges.subscribe(value => {
      this.filterGroup(value);
    });

    this.activeRoute.queryParamMap.subscribe(params => {
      if (params.get('id')) {
        const id = Number(params.get('id'));
        const employee = this.userService.listEmployee;
        if (employee.length != 0) {
          const found = employee.find(e => e.id == id);
          if (found) {
            this.isEdit = true;
            this.setForm(found);
          } else {
            this.isEdit = false;
            this.commonNotif.showInformation(this.label.ERROR_MSG.NOT_FOUND_ACCOUNT)
          }
        } else {
          this.isEdit = false;
        }
      }
    });
  }

  initForm() {
    this.formEmployee = new FormGroup({
      id: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthDate: new FormControl('', [Validators.required]),
      basicSalary: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required]),
      description: new FormControl({
        value: new Date(),
        disabled: true
      }, [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onEdit() {
    this.submitted = true;
    if (this.formEmployee.invalid) {
      this.formEmployee.markAllAsTouched();
      this.formEmployee.markAllAsDirty();
    } else {
      const formData = this.formEmployee.value;
      const payload: employee = {
        id: formData.id,
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        basicSalary: formData.basicSalary,
        birthDate: formData.birthDate,
        description: formData.description ? formData.description : new Date(),
        group: formData.group,
        status: formData.status
      };
      this.userService.updateEmployee(payload);
      this.notification.successUpdate(payload);
      this.formEmployee.reset();
      this.router.navigate(['master', 'employee', 'employee-list'])
    }
  }

  onSave() {
    this.submitted = true;
    if (this.formEmployee.invalid) {
      this.formEmployee.markAllAsTouched();
      this.formEmployee.markAllAsDirty();
    } else {
      const formData = this.formEmployee.value;

      const payload: employee = {
        id: Math.random(),
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        basicSalary: formData.basicSalary,
        birthDate: formData.birthDate,
        description: formData.description ? formData.description : new Date(),
        group: formData.group,
        status: formData.status
      };
      console.log('payload', payload)
      this.userService.addEmployee(payload);
      this.notification.successCreate(payload);
      this.formEmployee.reset();
      this.router.navigate(['master', 'employee', 'employee-list'])
    }
  }

  onCancel() {
    this.router.navigate(['master', 'employee', 'employee-list'])
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

  setForm(data: employee) {
    this.formEmployee.setValue({
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      basicSalary: data.basicSalary,
      birthDate: data.birthDate,
      description: data.description,
      group: data.group,
      status: data.status
    })
  }
}
