import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { employee } from '@config/interfaces/employee.interface';
import { group } from '@config/interfaces/group.interface';
import { status } from '@config/interfaces/status.interface';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private http = inject(HttpClient);
  private readonly _listEmployee = signal<employee[]>([]);


  constructor() { }

  getUsers() {
    return this.http.get<{ data: employee[] }>('/mocks/employee.json')
  }

  getGroup() {
    return this.http.get<{ data: group[] }>('/mocks/group.json')
  }

  getStatus() {
    return this.http.get<{ data: status[] }>('/mocks/status.json')
  }

  login() {
    return this.http.get<{ data: employee[] }>('/mocks/employee.json')
  }


  get listEmployee() {
    return this._listEmployee();
  }

  setListEmployee(data: employee[]) {
    this._listEmployee.set(data);
  }

  deleteEmployee(employeeId: number) {
    this._listEmployee.update(employee => employee.filter(e => e.id !== employeeId));
  }

  addEmployee(newEmployee: employee) {
    this._listEmployee.update(employee => [...employee, newEmployee])
  }

  updateEmployee(updatedEmployee: employee) {
    this._listEmployee.update(employee => employee.map(em => em.id === updatedEmployee.id ? updatedEmployee : em))
  }


}
