import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizacionService } from 'src/app/modules/act-fijos/services/autorizacion.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ValeService } from '../../../services/vale.service';

@Component({
  selector: 'app-vale-list-autorizacion',
  templateUrl: './vale-list-autorizacion.component.html',
  styleUrls: ['./vale-list-autorizacion.component.css']
})
export class ValeListAutorizacionComponent {
  idUser: any;
  user: any;
  data: any;
  totalAutorizaciones: any = 0;
  autorizaciones: any = [];
  autorizacionesTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  autorizacionForm: any;
  editForm: any;
  archiForm: any;
  buscarForm: any;
  buscarAutorizacion: any;
  cargando: boolean = true;
  idAutorizacion: any;
  URL = environment.api;
  autorizacion:any;
  date = new Date();

  constructor(private valeService: ValeService, private router: Router,){
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
  }

  ngOnInit(): void {
    this.cargarAutorizaciones();
  }

  cargarAutorizaciones() {
    this.cargando = true;
    this.valeService.getAllAutorizaciones()
      .subscribe((data: any) => {
        this.totalAutorizaciones = data.totalDocs;
        this.autorizaciones = data;
        this.autorizacionesTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
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
    this.cargarAutorizaciones();
  }

  addAutorizacion(){
    this.router.navigate(['/actFijos/autorizacion/create'])
  }

  print(element:any){
    this.autorizacion = element;
    console.log(this.autorizacion);
  }

  /**
   * Navega a la ruta de editar una autorización
   * @param id Identificador de la autorización a editar
   */
  edit(id: any) {
    // Redireccionamos a la ruta de editar una autorización con el id pasado
    this.router.navigate(['/actFijos/autorizacion/update', id]);
  }

  // borrarAutorizacion(id: string) {
  //   Swal.fire({
  //     title: 'Estas seguro?',
  //     text: '¡No podrás revertir esto!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: 'Cancelar',
  //     confirmButtonText: '¡Sí, bórralo!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire('¡Eliminado!', 'El Ingreso ha sido eliminado.', 'success');
  //       this.valeService.deleteAutorizacion(id).subscribe(
  //         (res) => console.log(res),
  //         (err) => console.log('HTTP Error', err),
  //         () => this.cargarAutorizaciones()
  //       );
  //     }
  //   });

  // }

  generarVale(id: string) {
    this.router.navigate(['/almacen/vale/create', id]);
  }

  listarVales() {
    this.router.navigate(['/almacen/vale/index']);
  }

  newVale() {
    this.router.navigate(['/almacen/vale/new']);
  }

  newValeLubri() {
    this.router.navigate(['/almacen/vale/lubricantes']);
  }

}
