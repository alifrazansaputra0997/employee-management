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
import { ConfirmationService } from '@services/common/confirmation-service/confirmation-service';
import { Label } from '@config/Labels';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ModalEmployee } from '../modal-employee/modal-employee';
import { Notification } from '@services/common/notification/notification';

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
    MatPaginatorModule,
    MatSnackBarModule,
    MatIcon,
  ],
  providers: [
    Notification
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  label = Label;
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

  constructor(
    private router: Router,
    private userService: Users,
    private loadingService: LoadingService,
    private confirmationService: ConfirmationService,
    private dialog: MatDialog,
    private notification: Notification
  ) { }

  ngOnInit(): void {
    this.initDDLGroup();

    /**
     * Karena menggunakan JSON biasa dan tidak mungkin untuk melakukan
     * perubahan terhadap file fisik dari JSON, jadi menggunakan alternative
     * lain yaitu signal.
     * JSON akan mengirim file ke signal dan disimpan temporary sehingga dapat
     * melakukan flow CRUD di local data
     */
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

    const dataEmployee = this.userService.listEmployee;
    const found = dataEmployee.filter((data: any) => {
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
    const employee = this.userService.listEmployee; // mendapatkan nilai dari signal

    this.dataTable = [...employee];
    this.dataTemporaryTable = [...employee];

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
        let listEmployee: employee[] = [];
        const dataEmployee = this.userService.listEmployee;
        if (dataEmployee.length == 0) {   // set signal, hanya sekali ketika init
          listEmployee = res.data;
          this.userService.setListEmployee(listEmployee);
        } else {
          listEmployee = dataEmployee;
        }

        this.dataTable = [...listEmployee];
        this.dataTemporaryTable = [...listEmployee];

        this.dataSource.data = this.dataTable;
      }
    })
  }

  onEdit(row: employee) {
    this.router.navigate(['master', 'employee', 'edit-employee'], {
      queryParams: {
        id: row.id
      }
    })
  }

  onDelete(row: employee) {
    const confirmation = this.confirmationService.confirmation(this.label.LABELS.CONFIRMATION_DELETE);
    confirmation.afterClosed().subscribe(res => {
      if (res && res.response == 'yes') {

        this.userService.deleteEmployee(row.id); // delete 1 user dari signal
        this.dataTable = this.userService.listEmployee;

        this.dataSource.data = this.dataTable;

        this.notification.successDelete(row);
      }
    })
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'name':
          return `${item.firstName} ${item.lastName}`;
        case 'birthDate':
          return new Date(item.birthDate).getTime();

        default:
          return item[property as keyof employee];
      }
    }
  }

  onView(row: employee) {
    this.dialog.open(ModalEmployee, {
      data: {
        ...row
      },
      panelClass: 'square-dialog',
      width: '80vw',
      maxWidth: '800px',
      minWidth: '350px',
      minHeight: '400px'
    })
  }

}
