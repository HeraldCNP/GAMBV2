import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ConvenioService } from '../../../services/convenio.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repre-create',
  templateUrl: './repre-create.component.html',
  styleUrls: ['./repre-create.component.css']
})
export class RepreCreateComponent implements OnInit {
  URL = environment.api;
  public representanteForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)] ],
    apellidos: ['', [Validators.required, Validators.minLength(3)] ],
    cargo: ['', [Validators.required] ],
    telefono: ['', [] ],
    ci: ['', [] ],
    email: ['', [] ],
  })

  constructor(
      private fb: FormBuilder,
      private api: ConvenioService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  crearRepresentante(form:any){
    this.api.crearRepresentante(form)
      .subscribe(
        res => {
          this.router.navigate(['convenio/representante/index']),
            this.alertOk('success', 'Exito', 'Representante Creado Correctamente', '2000')
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

  get form() {
    return this.representanteForm.controls;
  }

}
