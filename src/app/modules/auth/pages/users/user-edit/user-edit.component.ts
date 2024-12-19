import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { DependenciasService } from 'src/app/modules/correspondencia/services/dependencias.service';
import { Dependencia } from 'src/app/modules/correspondencia/interfaces/dependencia.interface';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  files: any = '';
  URL = environment.api;
  datosUser: any;
  userId: any;

  editForm: any;
  cargos: any;

  public dependencias = signal<Dependencia[]>([]);

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: AuthService,
    private fb: FormBuilder
  ) { }

  private dependenciaService = inject(DependenciasService);

  ngOnInit(): void {


    this.userId = this.activeRouter.snapshot.paramMap.get('id');
    this.cargarUser(this.userId);
    this.cargarCargos();
    this.cargarDependencias();

    this.editForm = this.fb.group({
      ci: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      surnames: ['', [Validators.required]],
      password: ['',],
      birthday: ['',],
      roles: ['',],
      cargo: [''],
      categoriaLicencia: [''],
      image: ['',],
      dependencia: ['',]
    })

  }

  cargarUser(id: string) {
    this.api.getSingleUser(id).subscribe(usuario => {
      this.datosUser = usuario;
      console.log(this.datosUser);
      const { ci, email, post, roles, surnames, username, cargo, categoriaLicencia, dependencia } = this.datosUser;

      this.editForm.patchValue({
        ci,
        email,
        username,
        surnames,
        roles,
        post,
        cargo,
        categoriaLicencia,
        dependencia,
        'password': '',
        'birthday': '',
        'image': '',
      });

    })
  }

  cargarCargos() {
    this.api.getAllCargos()
      .subscribe((data: any) => {
        this.cargos = data;
        // console.log('uniSolicitante', this.cargos);
      });
  }

  get form() {
    return this.editForm.controls;
  }



  editUsuario() {
    this.api.editUser(this.editForm.value, this.userId).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
        this.router.navigate(['auth/users']),
          this.alertOk('success', 'Exito', 'Usuario Editado Correctamente', '2000')
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

  cancel() {
    this.router.navigate(['auth/users'])
  }

  cargarDependencias() {
    this.dependenciaService.getDependencias()
      .subscribe({
        next: (data: any) => {
          this.dependencias.set(data.serverResponse);
          console.log('dependencias', this.dependencias());
        },
        error: (error: string | any) => {
          console.log(error);
        },
        complete: () => {
        }
      })
  }

}
