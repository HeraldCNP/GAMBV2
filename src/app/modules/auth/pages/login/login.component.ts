import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginI } from '../../models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});

  constructor(private authService: AuthService) { }
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
            localStorage.setItem("token", res.token);
            this.errorStatus = false;
          }else{
            this.errorStatus = true;
            this.errorMsj = "Credenciales incorrectas!!!";
          }
          console.log(res);
      });
  }
}
