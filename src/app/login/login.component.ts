import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../modules/auth/services/auth.service';
import { LoginI } from '../modules/auth/models/login.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router
  ) {}
  errorStatus: boolean = false;
  errorMsj: any = '';
  year = new Date();

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
    });
  }

  /*   sendLogin1(form:LoginI){
    this.authService.loginByUser(form)
      .subscribe(
        res => {
          let dataRes = res;
          console.log('data',dataRes);
          
          if(dataRes.token){
            this.cookie.set('token', dataRes.token, 0.2, '/');
            localStorage.setItem("user", JSON.stringify( dataRes ))
            localStorage.setItem("token",  dataRes.token )
            this.errorStatus = false;
            this.router.navigate(['dashboard/main'])
          }else{
            this.errorStatus = true;
            this.errorMsj = "Credenciales incorrectas!!!";
          }
          console.log(res);
        }
      );
  } */
  sendLogin(form: LoginI) {
    this.authService.loginByUser(form).subscribe(
      (res) => {
        let dataRes = res;
        if (dataRes.token) {
          this.cookie.set('token', dataRes.token, 0.2, '/');
          localStorage.setItem('user', JSON.stringify(dataRes));
          localStorage.setItem('token', dataRes.token);
          this.errorStatus = false;
          this.router.navigate(['dashboard/main']);
        } else {
          this.errorStatus = true;
          this.errorMsj = 'Credenciales incorrectas!!!';
        }
      },
      (error) => {
        console.log(error);
        if (error.status === 0) {
          setTimeout(() => {
            Swal.fire({
                icon: "error",
                title: "Error de Conexión",
                text: "No se puede conectar con el servidor. Por favor, inténtalo más tarde.",
            });
        }, 15);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.serverResponse || 'Ocurrió un error inesperado.',
          });
        }
      }
    );
  }
}
