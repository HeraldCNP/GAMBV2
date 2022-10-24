import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { ConvenioService } from '../../../services/convenio.service';

@Component({
  selector: 'app-enti-update',
  templateUrl: './enti-update.component.html',
  styleUrls: ['./enti-update.component.css']
})
export class EntiUpdateComponent implements OnInit {
  URL = environment.api;
  datosEntidad :any;
  entidadId: any;
  representantes:any = [];
  editarForm: any = new FormGroup({
    nombre: new FormControl('', Validators.required),
    representante: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    nit: new FormControl(''),
    cuenta: new FormControl(''),
  })

  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getRepresentantes(),
    this.entidadId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSingleEntidad(this.entidadId).subscribe(data => {
      this.datosEntidad = data;
      // console.log(this.datosEntidad);
      this.editarForm.setValue({
        'nombre': this.datosEntidad.nombre,
        'representante': this.datosEntidad.representante,
        'telefono': this.datosEntidad.telefono,
        'nit': this.datosEntidad.nit,
        'cuenta': this.datosEntidad.cuenta,
      });
    })

    
  }

  getRepresentantes(){
    this.api.getAllRepresentantes().subscribe
    (res => {
      this.representantes = res; 
      // console.log(this.representantes);
    });
  }

  editarEntidad(form:any){
    
    this.api.editarEntidad(form, this.entidadId)
      .subscribe(
        res => {
          this.router.navigate(['convenio/entidad/index']),
            this.alertOk('success', 'Exito', 'Entidad Editada Correctamente', '2000')
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
