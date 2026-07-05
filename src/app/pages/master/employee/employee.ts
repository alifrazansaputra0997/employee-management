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

}
