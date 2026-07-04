import { Component, OnInit, ViewChild } from '@angular/core';
import { FormSearchingEmployee } from '../components/form-searching-employee/form-searching-employee';
import { Router } from '@angular/router';
import { group } from '@config/interfaces/group.interface';
import { Users } from '@services/users/users';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { employee } from '@config/interfaces/employee.interface';
import { MatCardModule } from '@angular/material/card';
import { Paginator } from '@components/paginator/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
@Component({
  selector: 'app-employee-list',
  imports: [
    FormSearchingEmployee,
    MatTableModule,
    MatCardModule,
    Paginator,
    MatSortModule
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  DDLGroup: group[] = [];
  filteredGroup: group[] = [];
  dataTable: any[] = [];

  displayedColumns: string[] = [
    'action',
    'name',
    'email',
    'birthDate',
    'basicSalary',
    'status',
    'group'
  ];
  dataSource: MatTableDataSource<employee> = new MatTableDataSource<employee>([]);
  configPagination = {
    pageIndex: 0, // currentPage
    dataLength: 0, // totalData
    pageSize: 10, // perPage
  };
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private userService: Users,
  ) { }

  ngOnInit(): void {
    this.initDDLGroup();
    this.getEmployee();
  }

  initDDLGroup() {
    this.userService.getGroup().subscribe(res => {
      if (res.data) {
        this.DDLGroup = res.data;
        this.filteredGroup = [...this.DDLGroup];
      }
    })
  }

  onFind(e: any) {
    console.log('FORM', e);
  }

  onAddEmployee(e: any) {
    this.router.navigate(['master', 'employee', 'add-employee'])
  }

  getEmployee() {
    this.userService.getUsers().subscribe(res => {
      if (res.data) {
        const dataTable = res.data;
        this.dataTable = dataTable;
        console.log('this.dataSource', dataTable)
      }
    })
  }

  onEdit(row: any) {

  }

  onDelete(row: any) {

  }

  onDataReady(tableReady: any) {
    this.dataSource = new MatTableDataSource(tableReady);
  }

  matSortChange(event: any) {
    const colomn = event.active;
    const sort = event.direction;
    const sortedData = this.dataTable.sort((a, b) => typeof a[colomn] === 'string' ? a[colomn].localeCompare(b[colomn]) : a[colomn] - b[colomn]);
    if (sort === 'desc') {
      sortedData.reverse();
    }
    this.dataTable = [...sortedData];
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
