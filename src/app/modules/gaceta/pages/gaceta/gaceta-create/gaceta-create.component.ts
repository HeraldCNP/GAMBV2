import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GacetaService } from '../../../services/gaceta.service';

@Component({
  selector: 'app-gaceta-create',
  templateUrl: './gaceta-create.component.html',
  styleUrls: ['./gaceta-create.component.css']
})
export class GacetaCreateComponent implements OnInit {

  idUser: any;
  user: any;
  data: any;
  gacetaForm: any;
  
  files: any;
  progress: number = 0;

  // titulos: string[] = [
  //   "Iron Man",
  //   "Spiderman",
  //   "Thor",
  //   "Hulk",
  //   "Black Widow",
  //   "Hawk Eye"
  // ];

  titulos = {
    "list": [
      {
        "name": "Ley Autónoma Municipal"
      },
      {
        "name": "Resolución Municipal"
      },
      {
        "name": "Ordenanza Municipal"
      },
      {
        "name": "Decreto Municipal"
      },
      {
        "name": "Decreto Edil"
      }
    ]
  }




  constructor(
    private api: GacetaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
    this.idUser = this.data.id;
    this.gacetaForm = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
      detalle: new FormControl('', [Validators.required, Validators.minLength(3)]),
      numero: new FormControl('', [Validators.required, Validators.minLength(2)]),
      archivo: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      usuario: new FormControl(this.idUser, Validators.required)
    });
  }

  get form() {
    return this.gacetaForm.controls;
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  crearGaceta() {
    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();
    fd.append('archivo', this.files[0]);
    fd.append('titulo', this.gacetaForm.value.titulo);
    fd.append('detalle', this.gacetaForm.value.detalle);
    fd.append('numero', this.gacetaForm.value.numero);
    fd.append('fecha', this.gacetaForm.value.fecha);
    fd.append('usuario', this.idUser);



    this.api.registerGaceta(fd).subscribe(event => {
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
        this.router.navigate(['blog/gaceta/index']),
          this.alertOk('success', 'Exito', 'Documento Creado Correctamente', '2000')
      }
    )
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
    this.router.navigate(['gaceta/gaceta/index'])
  }

}
