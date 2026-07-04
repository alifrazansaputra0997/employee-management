import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { configPaginationi } from '@config/interfaces/paginator.interface';


@Component({
  selector: 'app-paginator',
  imports: [
    MatPaginatorModule
  ],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator implements OnChanges {
  @Input() dataTable: any[] = [];
  configPagination: configPaginationi = {
    pageIndex: 0,
    dataLength: 0,
    pageSize: 10,
  };

  @Output() onDataReady = new EventEmitter();
  @Output() onPageEvent = new EventEmitter();


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataTable'] && changes['dataTable'].currentValue) {
      this.setUpPagination()
    }
  }

  setUpPagination() {
    if (this.dataTable.length != 0) {
      const startIndex = this.configPagination.pageIndex * this.configPagination.pageSize;
      const endIndex = startIndex + this.configPagination.pageSize;
      this.configPagination.dataLength = this.dataTable.length;
      const hasil = this.dataTable.slice(startIndex, endIndex);
      this.onDataReady.emit(hasil)
    } else {
      this.onDataReady.emit([])
    }
  }

  handlePageEvent(event: any) {
    this.configPagination = {
      dataLength: event.length,
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    };
    this.setUpPagination();
  }
}
