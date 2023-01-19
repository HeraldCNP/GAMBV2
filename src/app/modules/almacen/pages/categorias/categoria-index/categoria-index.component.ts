import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-categoria-index',
  templateUrl: './categoria-index.component.html',
  styleUrls: ['./categoria-index.component.css'],
})
export class CategoriaIndexComponent implements OnInit {
  totalCategorias: any = 0;
  categorias: any = [];
  categoriasTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 5;
  totalPages: any;
  showModal: boolean = true;
  categoriaForm: any;
  cargando:boolean = true;

  constructor(
    private almacenService: AlmacenService,
    private fb: FormBuilder,
    ) {
      this.categoriaForm = this.fb.group({
        gestion: ['', [Validators.required]],
        codigo: ['', [Validators.required]],
        denominacion: ['', [Validators.required,]],
      })
    }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  get form() {
    return this.categoriaForm.controls;
  }



  cargarCategorias() {
    this.cargando = true;
    this.almacenService.getAllCategorias(this.limit, this.skip).subscribe((data: any) => {
      this.totalCategorias = data.totalDocs;
      this.categorias = data;
      this.categoriasTemp = data;
      this.totalPages = data.totalpage;
      console.log(data)
      this.cargando = false;
    });
  }

  cambiarPagina(valor: number) {
    this.skip += valor;
    this.page += valor;
    if (this.page < 0) {
      this.skip = 0;
    } else if (this.page > this.totalPages) {
      this.skip -= valor;
      this.page -= valor;
    }
    this.cargarCategorias();
  }

  crearCategoria(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.almacenService.createCategoria(form)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.categoriaForm.reset();
          this.cargarCategorias();
        }
      );
  }

  buscar(termino:string){
    if(termino.length === 0){
      this.categorias = this.categoriasTemp
      return
    }
    this.almacenService.searchCategoria(termino)
    .subscribe(resp => {
      console.log("Resp:", resp)
      this.categorias = resp;
    })
  }

  borrarCategoria(id:string){
    Swal.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'La Categoria ha sido eliminada.',
          'success'
        )
        this.almacenService.deleteCategoria(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.cargarCategorias()
        );
      }
    })
  }
}

