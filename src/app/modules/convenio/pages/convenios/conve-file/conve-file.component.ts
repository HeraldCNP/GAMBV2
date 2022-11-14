import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConvenioService } from '../../../services/convenio.service';

@Component({
  selector: 'app-conve-file',
  templateUrl: './conve-file.component.html',
  styleUrls: ['./conve-file.component.css']
})
export class ConveFileComponent implements OnInit {

  URL = environment.api;
  entidades2: any = [];
  montoTotal: any = 0;
  example: any = [];
  files:any;

  fileForm;

  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router
  ) {

    this.fileForm = this.fb.group({
      tipo: ['', [Validators.required]],
      file: ['', [Validators.required]],
    })


  }

  onChange($event:any) {
    this.files = $event.target.files;
  }


  // getRepresentante(id: any) {
  //   this.entidades2.forEach((entidad:any) => {
  //     let i = 0;
  //     if(entidad.text === id.target.value){
  //       this.entidades.controls[i].value.representante = entidad.representante.nombre + ' ' + entidad.representante.apellidos
  //       i++
  //     }
  //   });
  // }



  ngOnInit() {

  }

  crearConvenio(form: any) {
    this.api.crearConvenio(form)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {

          this.router.navigate(['convenio/convenio/index']),
            this.alertOk('success', 'Exito', 'Convenio Creado Correctamente', '2000')
        }
      );
  }

  get form(){
    return this.fileForm.controls;
  }




  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }

}
