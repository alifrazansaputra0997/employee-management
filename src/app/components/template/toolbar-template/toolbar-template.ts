import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Auth } from '@services/auth/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalEmployee } from '@pages/master/employee/modal-employee/modal-employee';
import { employee } from '@config/interfaces/employee.interface';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar-template',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './toolbar-template.html',
  styleUrl: './toolbar-template.css',
})
export class ToolbarTemplate implements OnInit {
  @Output() onOpenMenu = new EventEmitter()

  constructor(
    private authService: Auth,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

  }

  onClickMenu() {
    this.onOpenMenu.emit(true);
  }

  onLogout() {
    this.authService.removeUserLogin();
    this.router.navigate(['login'])
  }

  openProfile() {
    const user = this.authService.getLogin();
    this.onView(user);
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
