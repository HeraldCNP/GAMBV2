import { Component, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ValeService } from '../../../services/vale.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { ComprasService } from '../../../services/compras.service';
import { FormFacturaComponent } from '../components/form-factura/form-factura.component';
import { MatDialog } from '@angular/material/dialog';

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
  searchForm: any;

  fechaIni = new Date(this.obtenerFechaInicial()).toISOString();
  fechaHoy = new Date().toISOString();
  catProgras: any;
  btnActive = true;

  totalPrice: any;

  constructor(private valeService: ValeService, private router: Router, private fb: FormBuilder, private comprasService: ComprasService, private matDialog: MatDialog) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;

    this.searchForm = this.fb.group({
      catProgra: [''],
      estado: [''],
      del: [this.fechaIni.substr(0, 10)],
      al: [this.fechaHoy.substr(0, 10)],
      numeroVale: [''],
      productos: false,
    });
  }

  ngOnInit(): void {
    this.cargarCatProgras();
    this.cargarVales();
  }

  get form() {
    return this.searchForm.controls;
  }

  obtenerFechaInicial() {
    const date = new Date();
    const year = date.getFullYear();
    return `01/01/${year}`;
  }

  cargarCatProgras() {
    this.cargando = true;
    this.comprasService.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
      console.log("Cat Progras", data)
    });
  }


  cargarVales(params?: any) {

    if (!params) {
      params = {
        limit: 20,
        skip: 1,
      }
    }

    // console.log('params', params);

    if (params.estado === 'PENDIENTE') {
      this.btnActive = false;
    } else {
      this.btnActive = true;
    }

    this.cargando = true;
    this.valeService.getAllVales(params)
      .subscribe((data: any) => {
        this.totalVales = data.totalDocs;
        this.vales = data;
        this.valesTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
        this.totalPrice = null;

      });
  }

  mostrarTotales() {
    this.totalPrice = this.valesTemp.serverResponse.reduce((acc: any, order: any) => acc + order.precio, 0);
    // console.log(this.totalPrice);
  }

  finalizarVales() {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, Registrar!',
    }).then((result) => {
      if (result.isConfirmed) {

        this.valeService.finalizarVales(this.valesTemp.serverResponse).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => console.log('HTTP Error', err),
          () => {
            this.alertOk(
              'success',
              'Exito',
              'Vales Finalizados Correctamente',
              '2000'
            );
            this.cargarVales();
          }
        );
      }
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

    let params = {
      limit: this.limit,
      skip: this.skip
    }
    this.cargarVales(params);
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
    this.router.navigate(['/almacen/vale/update', id]);
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

          () => this.cargarVales()

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
            this.cargarVales()
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
            this.cargarVales()
          }, error => {
            console.log(error);
          })
        }
      })
    }
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }

  addFactura(idVale:string) {
    this.openDialog(idVale, 'Añadir Factura')
  }

  openDialog(id: any, title: any) {
    let dialog = this.matDialog.open(FormFacturaComponent, {
      width: '700px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: id,
        title: title,
      }
    });
    dialog.afterClosed().subscribe({
      next: (resp: any) => {
        if (resp == 'added') {
          this.cargarVales();
          // Swal.fire('Bien', `Factura Agregada Correctamente`, 'success')
        }

        if (resp == 'created') {
          this.cargarVales();
          // Swal.fire('Bien', `Factura Creada Correctamente`, 'success')
        }
      },
      error: (resp: any) => {
        console.log(resp);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

}
