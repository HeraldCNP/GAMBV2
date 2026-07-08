import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConvenioService } from '../../../services/convenio.service';

@Component({
  selector: 'app-enti-updated',
  templateUrl: './enti-updated.component.html',
  styleUrls: ['./enti-updated.component.css']
})
export class EntiUpdatedComponent implements OnInit {
  URL = environment.api;
  datosEntidad :any;
  entidadId: any;
  representantes:any = [];
  editarForm: any = new FormGroup({
    tipoEntidad: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required),
    denominacion: new FormControl('', Validators.required),
    sigla: new FormControl('', Validators.required),
    telefono: new FormControl(''),
    cuenta: new FormControl(''),
    nit: new FormControl(''),
    estado: new FormControl(),
  })
  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.entidadId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSingleEntidad(this.entidadId).subscribe(data => {
      this.datosEntidad = data;
      // console.log(this.datosEntidad);
      this.editarForm.setValue({
        'codigo': this.datosEntidad.codigo || '',
        'denominacion': this.datosEntidad.denominacion || '',
        'sigla': this.datosEntidad.sigla || '',
        'telefono': this.datosEntidad.telefono || '',
        'cuenta': this.datosEntidad.cuenta || '',
        'nit': this.datosEntidad.nit || '',
        'estado': this.datosEntidad.estado,
        'tipoEntidad': this.datosEntidad.tipoEntidad || '',
      });
    })
  }

  editarEntidad(form:any){
    
    this.api.editarEntity(form, this.entidadId)
      .subscribe(
        res => {
          this.router.navigate(['convenio/entidad/list']),
            this.alertOk('success', 'Exito', 'Entidad Editada Correctamente', '2000')
        }
      );
  }
  get form() {
    return this.editarForm.controls;
  }

  alertOk(icon:any, title:any, text:any, timer:any){
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }
  
  cancel(){
    this.router.navigate(['convenio/entidad/list'])
  }

}
