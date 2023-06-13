import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContaService } from '../../../services/conta.service';

@Component({
  selector: 'app-carpeta-create',
  templateUrl: './carpeta-create.component.html',
  styleUrls: ['./carpeta-create.component.css']
})
export class CarpetaCreateComponent implements OnInit {
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

  constructor(private fb: FormBuilder, private contaService: ContaService) {

    this.carpetaForm = this.fb.group({
      gestion: ['', [Validators.required]],
      objeto: ['', [Validators.required]],
      tomo: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      lugar: [''],
      ubicacion: [''],
      area: [''],
      tipo: [''],
      archivo: [''],
      observaciones: [''],
      usuario: [''],
    });


  }

  ngOnInit(): void {
    console.log(this.tipos);
    console.log(this.areas);

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
        this.tipos = ['Opción X', 'Opción Y', 'Opción Z'];
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



}
