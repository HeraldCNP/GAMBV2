import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../modules/auth/services/auth.service';
import { LoginI } from '../modules/auth/models/login.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router
    ) { }
  errorStatus:boolean = false;
  errorMsj:any = "";

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(30)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]),
    });
  }

  sendLogin(form:LoginI){
    this.authService.loginByUser(form)
      .subscribe(
        res => {
          let dataRes = res;
          if(dataRes.token){
            this.cookie.set('token', dataRes.token, 1, '/');
            localStorage.setItem("user", JSON.stringify( dataRes ))
            this.errorStatus = false;
            this.router.navigate(['private'])
          }else{
            this.errorStatus = true;
            this.errorMsj = "Credenciales incorrectas!!!";
          }
          console.log(res);
        }
      );
  }
}
