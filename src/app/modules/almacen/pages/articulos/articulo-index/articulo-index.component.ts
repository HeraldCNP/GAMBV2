import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Articulo } from '../../../interfaces/articulo';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-articulo-index',
  templateUrl: './articulo-index.component.html',
  styleUrls: ['./articulo-index.component.css']
})
export class ArticuloIndexComponent implements OnInit {
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
  editForm: any;
  cargando: boolean = true;
  idArticulo: any;
  nombre: string = '';

  constructor(private almacenService: AlmacenService, private fb: FormBuilder, private router: Router) {


    this.editForm = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      unidadDeMedida: ['', [Validators.required]],
      idPartida: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.cargarArticulos();
    this.cargarPartidas();
    this.cargarMedidas();

  }

  addArticulo() {
    this.router.navigate(['almacen/articulo/create']);
  }

  cargarArticulos() {
    this.cargando = true;
    this.almacenService
      .getAllArticulos(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalArticulos = data.totalDocs;
        this.articulos = data;
        this.articulosTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.articulos = this.articulosTemp;
      return;
    }
    // this.almacenService.searchArticulo(termino).subscribe((resp) => {
    //   console.log('Resp:', resp);
    //   this.articulos = resp;
    // });

    this.almacenService.searchArticulo(termino).subscribe(
      (res) => {
        console.log(res);
        this.articulos = res;
        this.articulosTemp = res;
      },
      (err) => console.log('HTTP Error', err),
      () => {

      }
    );


  }

  get form() {
    return this.editForm.controls;
  }

  cargarPartidas() {
    this.cargando = true;
    this.almacenService.getAllPartidas().subscribe((data: any) => {
      this.partidas = data[0].partidas;
      console.log("Partidas", data)
    });
  }



  cargarMedidas() {
    this.cargando = true;
    this.almacenService.getAllMedidas().subscribe((data: any) => {
      this.medidas = data.serverResponse;
      console.log("Medidas", data)
    });
  }

  doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  }

  resetForm() {
    this.articuloForm.reset();
  }

  createMedida() {

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

      }
    );
  }

  cargarDataEdit(articulo: any) {
    // console.log("Articulo", articulo.idPartida )

    this.editForm.setValue({
      codigo: articulo.codigo,
      nombre: articulo.nombre,
      unidadDeMedida: articulo.unidadDeMedida,
      idPartida: articulo.idPartida._id,
    });
    this.idArticulo = articulo._id;
  }




  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    this.almacenService.editProveedor(fd, id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.cargarArticulos();
      }
    );
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
    this.cargarArticulos();
  }

  borrarArticulo(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Eliminado!', 'El Articulo ha sido eliminado.', 'success');
        this.almacenService.deleteArticulo(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarArticulos()
        );
      }
    });
  }

  editArticulo(form: any) {
    this.almacenService.editArticulo(form, this.idArticulo).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log('HTTP Error', err);
      },
      () => {
        this.editForm.reset();
        this.alertOk(
          'success',
          'Exito',
          'Articulo editado Correctamente',
          '2000'
        );
        this.cargarArticulos();
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

  buscarCode() {

    this.almacenService.searchArticulo(this.editForm.value.codigo).subscribe((resp:any) => {
      // console.log('Resp:', resp.serverResponse);
      if(resp.serverResponse.length > 0){
        this.alertOk(
          'error',
          'Error',
          'El codigo ya existe',
          '2000'
        );
        this.editForm.value.codigo = 'a'
      }
    });
  }


}
