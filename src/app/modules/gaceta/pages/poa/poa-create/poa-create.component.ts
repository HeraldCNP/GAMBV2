import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GacetaService } from '../../../services/gaceta.service';

@Component({
  selector: 'app-poa-create',
  templateUrl: './poa-create.component.html',
  styleUrls: ['./poa-create.component.css']
})
export class PoaCreateComponent implements OnInit {
  idUser: any;
  user: any;
  data: any;
  poaForm: any;

  files: any;
  progress: number = 0;

  constructor(
    private api: GacetaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
    this.idUser = this.data.id;
    this.poaForm = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
      detalle: new FormControl('', [Validators.required, Validators.minLength(3)]),
      numero: new FormControl('', [Validators.required, Validators.minLength(2)]),
      archivo: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      usuario: new FormControl(this.idUser, Validators.required)
    });
  }

  titulos = {
    "list": [
      {
        "name": "POA Inicial"
      },
      {
        "name": "POA Corregido"
      },
    ]
  }

  get form() {
    return this.poaForm.controls;
  }

  crearPoa() {
    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();
    fd.append('archivo', this.files[0]);
    fd.append('titulo', this.poaForm.value.titulo);
    fd.append('detalle', this.poaForm.value.detalle);
    fd.append('numero', this.poaForm.value.numero);
    fd.append('fecha', this.poaForm.value.fecha);
    fd.append('usuario', this.idUser);



    this.api.registerPoa(fd).subscribe(event => {
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
        this.router.navigate(['docAdmin/poa/index']),
          this.alertOk('success', 'Exito', 'Documento Creado Correctamente', '2000')
      }
    )
  }

  onChange($event: any) {
    this.files = $event.target.files;
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
    this.router.navigate(['docAdmin/poa/index'])
  }


}
