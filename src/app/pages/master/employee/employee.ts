import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Users } from '@services/users/users';
import { MatSelectModule } from '@angular/material/select';
import { group } from '@config/interfaces/group.interface';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
@Component({
  selector: 'app-employee',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  formSearch!: FormGroup;

  DDLGroup: group[] = [];
  filteredGroup: group[] = [];
  searchEmployee = new FormControl('');

  constructor(
    private userService: Users
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initDDLGroup();

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

  initDDLGroup() {
    this.userService.getGroup().subscribe(res => {
      if (res.data) {
        this.DDLGroup = res.data;
        this.filteredGroup = [...this.DDLGroup];
      }
    })
  }

  filterGroup(value: string | null) {
    const keyword = (value ?? '').toLowerCase().trim();
    this.filteredGroup = this.DDLGroup.filter(group =>
      group.group.toLowerCase().includes(keyword)
    );
  }


}
