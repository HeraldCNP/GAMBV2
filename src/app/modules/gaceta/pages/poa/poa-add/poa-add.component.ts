import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GacetaService } from '../../../services/gaceta.service';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-poa-add',
  templateUrl: './poa-add.component.html',
  styleUrls: ['./poa-add.component.css']
})
export class PoaAddComponent implements OnInit {
  addForm: any;
  files: any;
  progress: number = 0;
  poaId: any;
  constructor(private router: Router, private api: GacetaService) {
    this.addForm = new FormGroup({
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      archivo: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  addArchivo(form: FormData) {
    let fd = new FormData();
    fd.append('descripcion', this.addForm.value.descripcion);
    fd.append('file', this.files[0]);
    this.api.addFile(this.poaId, fd).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }

      },
      (err) => {
        console.log('HTTP Error', err);
        this.progress = 0;
      },
      () => {
        this.progress = 0;
        this.alertOk(
          'success',
          'Exito',
          'Documento Creado Correctamente',
          '2000'
        );
        this.router.navigate(['docAdmin/poa/index']);
      }
    );
  }


  
  get form() {
    return this.addForm.controls;
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }
}
