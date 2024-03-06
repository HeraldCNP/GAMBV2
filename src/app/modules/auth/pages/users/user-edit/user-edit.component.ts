import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  files:any = '';
  URL = environment.api;
  datosUser :any;
  userId: any;

  editForm:any;
  cargos:any;

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api:AuthService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {

    this.userId = this.activeRouter.snapshot.paramMap.get('id');
    this.cargarUser(this.userId);
    this.cargarCargos();

    this.editForm = this.fb.group({
      ci: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      surnames: ['', [Validators.required]],
      password: ['', ],
      birthday: ['', ],
      roles: ['', ],
      cargo: [''],
      categoriaLicencia: [''],
      image:['', ]
    })

  }

  cargarUser(id:string){
    this.api.getSingleUser(id).subscribe(usuario => {
      this.datosUser = usuario;
      console.log(this.datosUser);
      const { ci, email, post, roles, surnames, username, cargo, categoriaLicencia } = this.datosUser;
      this.editForm.patchValue({
        ci,
        email,
        username,
        surnames,
        roles,
        post,
        cargo,
        categoriaLicencia,
        'password': '',
        'birthday': '',
        'image': '',
      });

    })
  }

  cargarCargos(){
    this.api.getAllCargos()
      .subscribe((data: any) => {
        this.cargos = data;
        console.log('uniSolicitante', this.cargos);
      });
  }

  get form() {
    return this.editForm.controls;
  }



  editUsuario(){
    this.api.editUser(this.editForm.value, this.userId).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
        this.router.navigate(['auth/users']),
          this.alertOk('success', 'Exito', 'Salida Editada Correctamente', '2000')
      }
    );
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }

  cancel(){
    this.router.navigate(['auth/users'])
  }
}
