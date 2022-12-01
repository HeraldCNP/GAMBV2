import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConvenioService } from '../../../services/convenio.service';

@Component({
  selector: 'app-enti-select',
  templateUrl: './enti-select.component.html',
  styleUrls: ['./enti-select.component.css']
})
export class EntiSelectComponent implements OnInit {

  URL = environment.api;
  datosEnti:any;
  // public entidadForm = this.fb.group({
  //   codigo: ['', [Validators.required, Validators.minLength(1)] ],
  //   sigla: ['', [Validators.required, Validators.minLength(3)] ],
  //   denominacion: ['', [Validators.required, Validators.minLength(3)] ],
  //   // representante: ['', [Validators.required] ],
  //   telefono: ['', [Validators.minLength(7)] ],
  //   nit: ['', [Validators.minLength(3)] ],
  //   cuenta: ['', ],
  // })


  entidadForm: any = new FormGroup({
    telefono: new FormControl(''),
    nit: new FormControl(''),
    cuenta: new FormControl(''),
  })

  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get form() {
    return this.entidadForm.controls;
  }

  crearEntidad(form:any){
    let fd = new FormData();
    fd.append('codigo', this.datosEnti.codigo);
    fd.append('denominacion', this.datosEnti.denominacion);
    fd.append('sigla', this.datosEnti.sigla);
    fd.append('telefono', this.entidadForm.value.telefono);
    fd.append('nit', this.entidadForm.value.nit);
    fd.append('cuenta', this.entidadForm.value.cuenta);
    this.api.crearEntidad(fd)
      .subscribe  (
        res => console.log(res),
        err => console.log('HTTP Error', err),
        () => {
          this.router.navigate(['convenio/entidad/index']),
          this.alertOk('success', 'Exito', 'Entidad Creada Correctamente', '2000')
        }
      );
  }

  buscar(codigo:any){
    if(codigo.length === 0){
      return;
    }

    this.api.selectEnti(codigo).subscribe(
      res => {
        if(res == null){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La entidad con el codigo '+codigo+' no existe',
           
          })
        }else{
          this.datosEnti = res;
        }
      }
    )
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
    this.router.navigate(['convenio/entidad/index'])
  }
}
