import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  convenioId: any;
  example: any = [];
  files:any;
  progress = 0;

  fileForm: any;

  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) {

    this.fileForm = this.fb.group({
      typefile: ['', [Validators.required]],
      file: ['', [Validators.required]],
    })


  }

  ngOnInit() {
    this.convenioId = this.activeRouter.snapshot.paramMap.get('id');

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





  uploadFile() {
    let fd = new FormData();
    fd.append('typefile', this.fileForm.value.typefile);
    fd.append('file', this.files[0]);


    this.api.addFile(fd, this.convenioId)
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          }
        },
        err => {
          console.log('HTTP Error', err)
          this.progress = 0;
        },
        () => {
            this.progress = 0;
            this.router.navigate(['convenio/convenio/index']),
            this.alertOk('success', 'Exito', 'Archivo adjuntando Correctamente', '2000')
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
