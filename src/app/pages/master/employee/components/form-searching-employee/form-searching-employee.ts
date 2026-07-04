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
import { CommonNotificationService } from '@services/common-notification/common-notification';
import { Label } from '@config/Labels';

@Component({
  selector: 'app-form-searching-employee',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './form-searching-employee.html',
  styleUrl: './form-searching-employee.css',
})
export class FormSearchingEmployee implements OnInit {
  label = Label;
  formSearch!: FormGroup;
  searchEmployee = new FormControl('');

  @Input() DDLGroup: group[] = [];
  @Input() filteredGroup: group[] = [];

  @Output() onFindAct = new EventEmitter();
  @Output() onAddEmployeeAct = new EventEmitter();

  constructor(
    private userService: Users,
    private commonNotificationService: CommonNotificationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.searchEmployee.valueChanges.subscribe(value => {
      this.filterGroup(value);
    });
  }


  initForm() {
    this.formSearch = new FormGroup({
      name: new FormControl('', [Validators.required]),
      group: new FormControl(''),
    });
  }


  filterGroup(value: string | null) {
    const keyword = (value ?? '').toLowerCase().trim();
    this.filteredGroup = this.DDLGroup.filter(group =>
      group.group.toLowerCase().includes(keyword)
    );
  }

  onFind() {
    if (this.formSearch.invalid) {
      this.commonNotificationService.showInformation(this.label.ERROR_MSG.PLEASE_FILL_FORM);
    } else {
      const payload = this.formSearch.value;
      this.onFindAct.emit(payload)
    }
  }

  onAddEmployee() {
    this.onAddEmployeeAct.emit(true);
  }
}
