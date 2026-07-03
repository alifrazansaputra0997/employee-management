import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { employee } from '@config/interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private http = inject(HttpClient);

  constructor() { }

  getUsers() {
    return this.http.get('/mocks/employee.json')
  }

  login() {
    return this.http.get<{data: employee[]}>('/mocks/employee.json')
  }

  
}
