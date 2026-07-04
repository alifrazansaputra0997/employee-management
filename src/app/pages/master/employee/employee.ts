import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Users } from '@services/users/users';
import { group } from '@config/interfaces/group.interface';
import { employee } from '@config/interfaces/employee.interface';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [
    MatButtonModule,
    MatCardModule,
    RouterOutlet,
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  constructor() { }

  ngOnInit(): void { }

 


 

 

  // handlePageEvent(event: any) {
  //   this.configPagination = {
  //     dataLength: event.length,
  //     pageIndex: event.pageIndex,
  //     pageSize: event.pageSize,
  //   };
  //   this.setUpPagination();
  // }

  // setUpPagination() {
  //   if (this.dataTable.length != 0) {
  //     const startIndex = this.configPagination.pageIndex * this.configPagination.pageSize;
  //     const endIndex = startIndex + this.configPagination.pageSize;
  //     this.configPagination.dataLength = this.dataTable.length;
  //     const hasil = this.dataTable.slice(startIndex, endIndex);
  //     this.onDataReady.emit(hasil)
  //   } else {
  //     this.onDataReady.emit([])
  //   }

  //   this.loadingService.setLoading(false);
  // }


}
