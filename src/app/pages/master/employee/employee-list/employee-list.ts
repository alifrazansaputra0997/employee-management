import { Component, OnInit, ViewChild } from '@angular/core';
import { FormSearchingEmployee } from '../components/form-searching-employee/form-searching-employee';
import { Router } from '@angular/router';
import { group } from '@config/interfaces/group.interface';
import { Users } from '@services/users/users';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { employee } from '@config/interfaces/employee.interface';
import { MatCardModule } from '@angular/material/card';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { formSearchPayload } from '@config/interfaces/employee-list.interface';
import { LoadingService } from '@services/common/loading-service/loading-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-employee-list',
  imports: [
    FormSearchingEmployee,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    MatButtonModule,
    DatePipe,
    CurrencyPipe,
    MatPaginatorModule
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  DDLGroup: group[] = [];
  filteredGroup: group[] = [];
  dataTable: any[] = [];
  dataTemporaryTable: any[] = [];

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


  constructor(
    private router: Router,
    private userService: Users,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.initDDLGroup();
    this.getEmployee();
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

  onFind(e: formSearchPayload) {
    this.loadingService.setLoading(true);
    const payload: formSearchPayload = {
      group: e.group != '' ? e.group : '',
      name: e.name
    };
    const payloadName = String(payload.name).toLowerCase().trim();
    const payloadGroup = payload.group;
    const found = this.dataTemporaryTable.filter((data: any) => {
      const fullName = String(`${data.firstName} ${data.lastName}`).toLowerCase();

      const matchName = fullName.includes(payloadName);
      const matchGroup = data.group == payloadGroup;
      return matchName && matchGroup;
    });
    this.dataSource.data = found;
    this.paginator.firstPage();
    this.loadingService.setLoading(false);
  }

  onResetForm(e: any) {
    this.loadingService.setLoading(true);
    this.dataTable = [...this.dataTemporaryTable];
    this.dataTemporaryTable = [...this.dataTemporaryTable];
    this.dataSource.data = this.dataTable;
    this.loadingService.setLoading(false);
  }

  onAddEmployee(e: any) {
    this.router.navigate(['master', 'employee', 'add-employee'])
  }

  getEmployee() {
    this.loadingService.setLoading(true);
    this.userService.getUsers().subscribe(res => {
      if (res.data) {
        this.loadingService.setLoading(false);
        this.dataTable = [...res.data];
        this.dataTemporaryTable = [...res.data];

        this.dataSource.data = this.dataTable;
      }
    })
  }

  onEdit(row: any) {

  }

  onDelete(row: any) {

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
    this.dataSource.paginator = this.paginator;
  }

}
