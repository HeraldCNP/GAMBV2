import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConvenioService } from '../../../services/convenio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enti-create',
  templateUrl: './enti-create.component.html',
  styleUrls: ['./enti-create.component.css']
})
export class EntiCreateComponent implements OnInit {
  URL = environment.api;
  representantes:any = [];
  public entidadForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(3)] ],
    representante: ['', [Validators.required, Validators.minLength(3)] ],
    telefono: ['', [Validators.required, Validators.minLength(3)] ],
    nit: ['', [Validators.required, Validators.minLength(3)] ],
    cuenta: ['', ],
  })
  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRepresentantes();
  }

  crearEntidad(form:any){
    this.api.crearEntidad(form)
      .subscribe(
        res => {
          this.router.navigate(['convenio/entidad/index']),
            this.alertOk('success', 'Exito', 'Entidad Creada Correctamente', '2000')
        }
      );
  }

  getRepresentantes(){
    this.api.getAllRepresentantes().subscribe
    (res => {
      this.representantes = res; 
      // console.log(this.representantes);
    });
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
