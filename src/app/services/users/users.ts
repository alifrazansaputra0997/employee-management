import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { employee } from '@config/interfaces/employee.interface';
import { group } from '@config/interfaces/group.interface';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private http = inject(HttpClient);

  constructor() { }

  getUsers() {
    return this.http.get('/mocks/employee.json')
  }

  getGroup(){
    return this.http.get<{data: group[]}>('/mocks/group.json')
  }

  login() {
    return this.http.get<{data: employee[]}>('/mocks/employee.json')
  }

  

  
}
