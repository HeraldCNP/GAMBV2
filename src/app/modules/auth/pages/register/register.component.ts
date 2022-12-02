import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:any;

  // public ci: string,
  // public email: string,
  // public username: string,
  // public surnames: string,
  // public registerdate: string,
  // public password?: string,
  // public post?: string,
  // public roles?: string,
  // public _id?: string

  constructor(
    private fb: FormBuilder,
    private api: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      ci: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      surnames: ['', [Validators.required]],
      password: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
    });
  }

  cancel(){
    this.router.navigate(['auth/users'])
  }

  crearUsuario(form:Usuario){
    this.api.addUser(form)
      .subscribe(
        res => {
          this.router.navigate(['auth/users']),
            this.alertOk('success', 'Exito', 'Usuario Creado Correctamente', '2000')
        }
      );
  }

  alertOk(icon:any, title:any, text:any, timer:any){
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }
}
