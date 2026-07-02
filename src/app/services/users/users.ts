import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private http = inject(HttpClient);

  constructor(){ }

  getUsers(){
    return this.http.get('/mocks/employee.json')
  }
}
