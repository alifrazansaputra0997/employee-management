import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { employee } from '@config/interfaces/employee.interface';
import { group } from '@config/interfaces/group.interface';
import { status } from '@config/interfaces/status.interface';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private http = inject(HttpClient);

  constructor() { }

  getUsers() {
    return this.http.get<{data: employee[]}>('/mocks/employee.json')
  }

  getGroup(){
    return this.http.get<{data: group[]}>('/mocks/group.json')
  }

  getStatus(){
    return this.http.get<{data: status[]}>('/mocks/status.json')
  }

  login() {
    return this.http.get<{data: employee[]}>('/mocks/employee.json')
  }

  

  
}
