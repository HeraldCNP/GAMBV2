import { Component, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ValeService } from '../../../services/vale.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vale-index',
  templateUrl: './vale-index.component.html',
  styleUrls: ['./vale-index.component.css']
})
export class ValeIndexComponent {
  idUser: any;
  user: any;
  data: any;
  totalVales: any = 0;
  vales: any = [];
  valesTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 20;
  totalPages: any;
  autorizacionForm: any;
  editForm: any;
  archiForm: any;
  buscarForm: any;
  buscarAutorizacion: any;
  cargando: boolean = true;
  idAutorizacion: any;
  URL = environment.api;
  vale: any;
  vale2 = signal<any>(null);
  date = new Date();


  constructor(private valeService: ValeService, private router: Router,) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;

  }

  ngOnInit(): void {
    this.cargarAutorizaciones();
  }


  cargarAutorizaciones() {
    this.cargando = true;
    this.valeService.getAllVales(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalVales = data.totalDocs;
        this.vales = data;
        this.valesTemp = data;
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

  addAutorizacion() {
    this.router.navigate(['/actFijos/autorizacion/create'])
  }

  print(element: any) {
    console.log(this.vale);
    this.vale = element;
  }

  print2(element: any) {
    console.log('antes', this.vale2());
    this.vale2.set(element);
    console.log(this.vale2());
  }

  /**
   * Navega a la ruta de editar una autorización
   * @param id Identificador de la autorización a editar
   */
  edit(id: any) {
    // Redireccionamos a la ruta de editar una autorización con el id pasado
    this.router.navigate(['/actFijos/autorizacion/update', id]);
  }

  deleteVale(id: string) {
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

        this.valeService.deleteVale(id).subscribe(
          (res) => {
            Swal.fire('¡Eliminado!', 'El Ingreso ha sido eliminado.', 'success');
          },
          (err) => Swal.fire('¡Error!', err.error.serverResponse, 'error').then(() => console.log('HTTP Error', err)),

          () => this.cargarAutorizaciones()

        );
      }
    });
  }

  generarVale(id: string) {
    this.router.navigate(['/almacen/vale/create', id]);
  }

  cambiarEstado(vale: any) {
    console.log(vale);


    if (vale.estado === "REGISTRADO") {
      const form: any = {
        estado: 'PENDIENTE',
      }
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Esta seguro que recibió la factura?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.valeService.cambiarEstado(vale._id, form).subscribe(data => {
            this.cargarAutorizaciones()
          }, error => {
            console.log(error);
          })
        }
      })
    }

    if (vale.estado === "PENDIENTE") {
      const form: any = {
        estado: 'REGISTRADO',
      }
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Esta seguro de cambiar a estado REGISTRADO?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.valeService.cambiarEstado(vale._id, form).subscribe(data => {
            this.cargarAutorizaciones()
          }, error => {
            console.log(error);
          })
        }
      })
    }
  }
}
