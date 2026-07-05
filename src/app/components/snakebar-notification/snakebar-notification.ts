import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
@Component({
  selector: 'app-snakebar-notification',
  imports: [],
  templateUrl: './snakebar-notification.html',
  styleUrl: './snakebar-notification.css',
})
export class SnakebarNotification implements OnInit {
  snackBarRef = inject(MatSnackBarRef);
  message: string = '';
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
    this.message = this.data.message;   
  }
}
