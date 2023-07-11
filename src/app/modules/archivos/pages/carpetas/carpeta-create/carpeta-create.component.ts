import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { CarpetaService } from '../../../services/carpeta.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carpeta-create',
  templateUrl: './carpeta-create.component.html',
  styleUrls: ['./carpeta-create.component.css']
})
export class CarpetaCreateComponent implements OnInit {
  idUser: any;
  user: any;
  data: any;
  carpetaForm: any;
  files: any;
  progress: number = 0;
  area: boolean = true;

  areas = {
    "list": [
      {
        "name": "Administración",
        "slug": "administracion"
      },
      {
        "name": "Contabilidad",
        "slug": "contabilidad"
      },
      {
        "name": "Recaudaciones",
        "slug": "recaudaciones"
      },
      {
        "name": "Legal",
        "slug": "legal"
      }
    ]
  }

  tipos: string[] = [];

  constructor(private fb: FormBuilder, private carpetaService: CarpetaService, private router: Router) {

    this.carpetaForm = this.fb.group({
      gestion: ['2023', [Validators.required]],
      area: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      numCarpeta: ['', [Validators.required]],
      nameCarpeta: ['', [Validators.required]],
      lugar: [''],
      estante: ['', [Validators.required]],
      fila: [''],
    });


  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;

  }

  get form() {
    return this.carpetaForm.controls;
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  actualizarSegundoSelect() {
    console.log("cambio");

    switch (this.carpetaForm.value.area) {
      case 'administracion':
        this.tipos = ['Opción A', 'Opción B', 'Opción C'];
        break;
      case 'contabilidad':
        this.tipos = ['Preventivos', 'Devengados', 'Estados Financieros', 'Ingresos', 'Otros'];
        break;
      case 'recaudaciones':
        this.tipos = ['Opción 1', 'Opción 2', 'Opción 3'];
        break;
      case 'legal':
        this.tipos = ['Opción 4', 'Opción 5', 'Opción 6'];

        break;
      default:
        this.tipos = [];
        break;
    }
  }

  crearCarpeta(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.carpetaService.registrarCarpeta(form).subscribe(
      (res) => {
        console.log(res);
      },

      (err) => console.log('HTTP Error', err),
      () => {
        this.carpetaForm.reset();
        this.router.navigate(['archivos/carpetas/index']);
        this.alertOk(
          'success',
          'Exito',
          'Carpeta Creada Correctamente',
          '2000'
        );
      }
    );
  }





  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }

  cancel() {
    this.router.navigate(['archivos/carpetas/index']);
  }



}
