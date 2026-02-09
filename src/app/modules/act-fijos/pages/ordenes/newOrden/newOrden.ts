import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasService } from 'src/app/modules/almacen/services/compras.service';
import { AutorizacionService } from '../../../services/autorizacion.service';
import { Validators } from 'ngx-editor';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ValeService } from 'src/app/modules/almacen/services/vale.service';
import { arrow } from '@popperjs/core';

@Component({
  selector: 'app-new-orden',
  templateUrl: './newOrden.html',
  styleUrl: './newOrden.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrden { 

   idUser: any;
  user: any;
  data: any;
  createForm: any;

  catProgras: any;
   compras:any;
  noHayStock: boolean = false;
  compraSingle:any;

  unidades: any;
  vehiculos: any;
  conductores: any;
  articulos: any;
  articulosTemp: any;
  article: any;
  productos: any = [];
  servicios: any = [];
  fechaHoy = new Date().toISOString();
private _snackBar = inject(MatSnackBar);
   constructor(
      private activeRouter: ActivatedRoute,
      private fb: FormBuilder,
      private comprasService: ComprasService,
      private router: Router,
      private valeService: ValeService,
      private autorizacionService: AutorizacionService,
      ) {
      this.user = localStorage.getItem('user');
      this.data = JSON.parse(this.user);
      this.idUser = this.data.id;
    //  this.idAutorizacion = this.activeRouter.snapshot.paramMap.get('id');
  
  
     // console.log(this.idAutorizacion);
  
      this.createForm = this.fb.group({
        // autorizacion: [this.idAutorizacion],
        precio: [0],
        catProgra: ['', [Validators.required]],
        encargadoControl: [this.idUser],
        descripcion: ['', [Validators.required]],
        destino: ['', [Validators.required]],
        // unidadSolicitante: ['', [Validators.required]],
        conductor: ['', [Validators.required]],
        vehiculo: [''],
        fecha: [this.fechaHoy.substr(0, 10), [Validators.required]],
        productos: [[]],
        servicios: [[]],
        unidadSolicitante: [''],
        tipoServicio:['', [Validators.required]],
      });
    }

    ngOnInit(): void {
    this.cargarCatProgras();
    this.cargarUnidadSolicitante();
    this.cargarConductor();
    this.cargarVehiculo();
  }
  

   buscar(termino: string) {
    console.log(termino);
    
    if (termino.length === 0) {
      this.articulos = this.articulosTemp;
      return;
    }
     if (termino.includes('%')) {
      console.log('La cadena contiene el signo "%".');
      this.comprasService.getArticulo(termino).subscribe((resp) => {
        console.log('Resp:', resp);
        this.articulos = resp;
        if (this.articulos.serverResponse.length == 1) {

          this.article = this.articulos.serverResponse[0];

          this.addArticulo(this.article)
        }
      });
    } else {
      this.comprasService.searchArticulo(termino).subscribe((resp) => {
        console.log('Resp:', resp);
        this.articulos = resp;
        if (this.articulos.serverResponse.length == 1) {

          this.article = this.articulos.serverResponse[0];

          this.addArticulo(this.article)
        }
      });
    }
  }
  addService(serviceName: string) {
    console.log("SERV",serviceName);
    
    this.servicios.push({
      servicio: serviceName,
      cantidadServicio: 0,
      unidadMedidaSer: 'Servicio',
      precioServ: 0,
    });
  }
  addArticulo(article: any) {
    this.productos.push({
      idArticulo: article._id,
      codigo: article.codigo,
      partidaGasto: article.idPartida.codigo,
      articulo: article.nombre,
      cantidadCompra: 0,
      unidadMedida: article.unidadDeMedida,
      precio: 0,
    });
  }

  calculateTotalCost() {
    return this.productos.reduce((acc: any, item: any) => acc + (item.precio * item.cantidadCompra), 0);
  }
  calculateTotalServ() {
    return this.servicios.reduce((acc: any, item: any) => acc + (item.precioServ * item.cantidadServicio), 0);
  }

   cambio(event: any, i: number, field: string) {

    // console.log("valor", event.target.innerText)
    // console.log("indice", i)
    // console.log("field", field)


    this.productos[i][field] = event.target.innerText;

    this.createForm.patchValue({
      productos: this.productos
    })

  }
   cambioServ(event: any, i: number, field: string) {

    // console.log("valor", event.target.innerText)
    // console.log("indice", i)
    // console.log("field", field)


    this.servicios[i][field] = event.target.innerText;

    this.createForm.patchValue({
      servicios: this.servicios
    })

  }

   removeArticulo(index: number) {
    console.log('articleIndex', index)
    // if(index == 0){
    //   this.listadeArticulos.splice(0, 1);
    // }
    this.productos.splice(index, 1);
  }
  removeServicio(index: number) {
    console.log('servicioIndex', index)
    // if(index == 0){
    //   this.listadeArticulos.splice(0, 1);
    // }
    this.servicios.splice(index, 1);
  }

   crearOrden(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.autorizacionService.createOrden(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err)=> {
        console.log('HTTP Error', err)
        this._snackBar.open(err.error.serverResponse, 'Cerrar', {
          duration: 3000
        });
      },
      () => {

        this.router.navigate(['/actFijos/ordenes']);
        this.alertOk(
          'success',
          'Exito',
          'Vale Creado Correctamente',
          '2000'
        );
        this.createForm.submitted = true;
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

     cargarCatProgras() {
    this.comprasService.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
    });
  }

   doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
    this.valeService.getCompraOfCombustible(this.createForm.value.idProducto, this.createForm.value.catProgra).subscribe((data: any) => {
      if(data.serverResponse.length == 0){
        this.noHayStock = true;
      }
      else{
        this.compras = data.serverResponse;
        this.noHayStock = false;
        console.log('compras', this.compras);
        
      }
    });

  }

  get form() {
    return this.createForm.controls;
  }

  cargarVehiculo() {
    this.autorizacionService.getAllVehiculos()
      .subscribe((data: any) => {
        this.vehiculos = data.serverResponse;
      });
  }

  cargarUnidadSolicitante() {
    this.autorizacionService.getAllUnidadSolicitante()
      .subscribe((data: any) => {
        this.unidades = data;
      });
  }

  cargarConductor() {
    this.autorizacionService.getAllConductores()
      .subscribe((data: any) => {
        this.conductores = data.serverResponse;
      });
  }

   cancel() {
    this.router.navigate(['/actFijos/ordenes'])
  }

   doSelect2 = (id: any) => {
      this.compraSingle = this.compras.find((objeto: any) => objeto._id === id);
      console.log('compraSingle', this.compraSingle);
    }
    
    calcularStock() {
      if(this.compraSingle){
        if (this.createForm.value.cantidad > this.compraSingle.stockCompra) {
          Swal.fire('Cantidad insuficiente')
          this.createForm.value.cantidad = 0;
        }
      }
  
    }

}
