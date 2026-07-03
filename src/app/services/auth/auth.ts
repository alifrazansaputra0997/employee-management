import { Injectable } from '@angular/core';
import { employee } from '@config/interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  setLogin(data: employee) {
    localStorage.setItem('userAuth', JSON.stringify(data));
  }

  getLogin(){
    return localStorage.getItem('userAuth')
  }

  removeUserLogin(){
    localStorage.clear();
  }
}
