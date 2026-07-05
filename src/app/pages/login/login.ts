import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Users } from '@services/users/users';
import { Label } from 'src/app/config/Labels';
import { CommonNotificationService } from '@services/common/common-notification/common-notification';
import { Auth } from '@services/auth/auth';
import { Router } from '@angular/router';

interface login {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [
    CommonNotificationService
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  label = Label;
  loginForm!: FormGroup;

  constructor(
    private commonNotificationService: CommonNotificationService,
    private usersService: Users,
    private authService: Auth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.usersService.getUsers().subscribe(res => console.log('USERS', res))
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }


  onSignIn() {
    if (this.loginForm.invalid) {
      this.commonNotificationService.showInformation(this.label.ERROR_MSG.LOGIN_FAILED);
      this.loginForm.markAllAsDirty();
    } else {
      const formData = this.loginForm.value;
      const payload: login = {
        username: formData.username,
        password: formData.password,
      }
      this.usersService.login().subscribe((res) => {
        const employee = res.data;
        const foundEmployee = employee.find((e) => e.username == payload.username);
        if (foundEmployee) {
          if (payload.password == foundEmployee.password) {
            delete foundEmployee.password;
            this.authService.setLogin(foundEmployee);
            this.router.navigate(['dashboard'])
          } else {
            this.commonNotificationService.showInformation(this.label.ERROR_MSG.LOGIN_FAILED);
          }
        } else {
          this.commonNotificationService.showInformation(this.label.ERROR_MSG.LOGIN_FAILED);
        }
      })
    }
  }




}
