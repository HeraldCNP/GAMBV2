import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { GacetaService } from '../../../services/gaceta.service';

@Component({
  selector: 'app-gaceta-update',
  templateUrl: './gaceta-update.component.html',
  styleUrls: ['./gaceta-update.component.css']
})
export class GacetaUpdateComponent implements OnInit {

  URL = environment.api;
  datosGaceta: any = [];
  gacetaId: any;
  idUser: any;
  user: any;
  data: any;
  files:any = '';
  progress: number = 0;

  editarForm: any = new FormGroup({
    titulo: new FormControl('', Validators.required),
    detalle: new FormControl('', Validators.required),
    numero: new FormControl(''),
    archivo: new FormControl(''),
    fecha: new FormControl(''),
    usuario: new FormControl(''),
  })

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
    private fb: FormBuilder,
    private api: GacetaService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) { }



  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
    this.idUser = this.data.id;
    // this.getEntidades();
    this.gacetaId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getGaceta(this.gacetaId).subscribe(data => {
      this.datosGaceta = data.serverResponse;
      console.log("Doc", this.datosGaceta);
      this.editarForm.setValue({
        'titulo': this.datosGaceta.titulo,
        'detalle': this.datosGaceta.detalle,
        'numero': this.datosGaceta.numero,
        'fecha': this.datosGaceta.fecha.substr(0, 10),
        'usuario': this.idUser,
        'archivo': this.datosGaceta.archivo,
      });
    });


  }

  get form() {
    return this.editarForm.controls;
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }


  editarGaceta() {
    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();
    if (typeof (this.files[0]) == 'object') {
      fd.append('archivo', this.files[0]);
      fd.append('titulo', this.editarForm.value.titulo);
      fd.append('detalle', this.editarForm.value.detalle);
      fd.append('numero', this.editarForm.value.numero);
      fd.append('fecha', this.editarForm.value.fecha);
      fd.append('usuario', this.idUser);

    } else {
      fd.append('archivo', this.editarForm.value.archivo);
      fd.append('titulo', this.editarForm.value.titulo);
      fd.append('detalle', this.editarForm.value.detalle);
      fd.append('numero', this.editarForm.value.numero);
      fd.append('fecha', this.editarForm.value.fecha);
      fd.append('usuario', this.idUser);
    }

    this.api.editarGaceta(fd, this.gacetaId).subscribe(event => {
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
        this.router.navigate(['docAdmin/gaceta/index']),
          this.alertOk('success', 'Exito', 'Documento Editado Correctamente', '2000')
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
    this.router.navigate(['docAdmin/gaceta/index'])
  }


}
