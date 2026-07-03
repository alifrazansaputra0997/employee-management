import { Injectable } from '@angular/core';
import { employee } from '@config/interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  setLogin(data: employee) {
    localStorage.setItem('userAuth', JSON.stringify(data));
  }

  getLogin() {
    const user = localStorage.getItem('userAuth');
    return user ? JSON.parse(user) : null;
  }

  removeUserLogin() {
    localStorage.clear();
  }
}
