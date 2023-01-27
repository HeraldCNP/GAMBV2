import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Articulo } from '../../../interfaces/articulo';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-articulo-index',
  templateUrl: './articulo-index.component.html',
  styleUrls: ['./articulo-index.component.css']
})
export class ArticuloIndexComponent implements OnInit {
  totalArticulos: number = 0;
  articulos: Articulo[] = [];
  categorias: any[] = [];
  articulosTemp: Articulo[] = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  articuloForm: any;
  editForm: any;
  cargando: boolean = true;
  idArticulo: string = "";

  constructor(private almacenService: AlmacenService, private fb: FormBuilder) {
    this.articuloForm = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      unidadDeMedida: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      idCategoria: ['', [Validators.required]],
      idUsuario: ['', [Validators.required]],
    });

    this.editForm = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      unidadDeMedida: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      idCategoria: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos() {
    this.cargando = true;
    this.almacenService
      .getAllProveedores(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalArticulos = data.totalDocs;
        this.articulos = data;
        this.articulosTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }


}
