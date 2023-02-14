import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Articulo } from '../../../interfaces/articulo';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-articulo-create',
  templateUrl: './articulo-create.component.html',
  styleUrls: ['./articulo-create.component.css']
})
export class ArticuloCreateComponent implements OnInit {
  idUser: any;
  user: any;
  data: any;
  totalArticulos: number = 0;
  articulos: any = [];
  partidas: any = [];
  medidas: any = [];
  articulosTemp: Articulo[] = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  articuloForm: any;
  medidaForm: any;
  editForm: any;
  cargando: boolean = true;
  idArticulo: any;
  constructor(private almacenService: AlmacenService, private fb: FormBuilder, private router: Router) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;

    this.articuloForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.min(2)]],
      nombre: ['', [Validators.required , Validators.min(3)]],
      unidadDeMedida: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      ubicacion: [''],
      idPartida: ['', [Validators.required]],
      idUsuario: [this.idUser],
    });

    this.medidaForm = this.fb.group({
      unidadMedida: ['', [Validators.required]],
      simbolo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarMedidas();
    this.cargarPartidas();
  }

  cargarPartidas() {
    this.cargando = true;
    this.almacenService.getAllPartidas().subscribe((data: any) => {
      this.partidas = data[0].partidas;
      console.log("Partidas", data[0].partidas)
    });
  }

  cargarMedidas() {
    this.cargando = true;
    this.almacenService.getAllMedidas().subscribe((data: any) => {
      this.medidas = data.serverResponse;
      console.log("Medidas", data)
    });
  }

  crearArticulo(form: any) {

    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.almacenService.createArticulo(form).subscribe(
      (res) => {
        console.log(res);
      },

      (err) => console.log('HTTP Error', err),
      () => {
        this.articuloForm.reset();
        this.router.navigate(['almacen/articulo/index']);
        this.alertOk(
          'success',
          'Exito',
          'Documento Creado Correctamente',
          '2000'
        );
      }
    );
  }

  doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  }

  get form() {
    return this.articuloForm.controls;
  }

  get form2() {
    return this.medidaForm.controls;
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }

  crearMedida(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.almacenService.createMedida(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.medidaForm.reset();
        this.cargarMedidas();
        this.alertOk(
          'success',
          'Exito',
          'Medida Creada Correctamente',
          '2000'
        );
      }
    );
  }

  cancel() {
    this.router.navigate(['almacen/articulo/index']);
  }


  resetForm() {
    this.medidaForm.reset();
  }


}
