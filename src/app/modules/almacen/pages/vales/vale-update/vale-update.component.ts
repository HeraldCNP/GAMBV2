import { Component } from '@angular/core';
import { ValeService } from '../../../services/vale.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasService } from '../../../services/compras.service';
import { AutorizacionService } from 'src/app/modules/act-fijos/services/autorizacion.service';

@Component({
  selector: 'app-vale-update',
  templateUrl: './vale-update.component.html',
  styleUrls: ['./vale-update.component.css']
})
export class ValeUpdateComponent {

  idUser: any;
  user: any;
  data: any;
  articulos: any;
  article: any;
  articulosTemp: any;
  valeId: any;
  listadeArticulos: any = [];
  proveedorForm: any;
  fechaHoy = new Date().toISOString();
  // fechaHoy:string = "2023/02/02";

  catProgras: any;
  proveedores: any;
  funcionarios: any;
  vehiculos: any;
  cargando: boolean = true;
  gaso: boolean = false;
  dataVale: any;

  editForm = this.fb.group({
    cantidad: [0],
    precio: ['', Validators.required],
    catProgra: ['', [Validators.required]],
    motivo: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    conductor: ['', [Validators.required]],
    vehiculo: [''],
    fecha: [this.fechaHoy.substr(0, 10), [Validators.required]],
    idProducto: [''],
  });

  constructor(
    private valeService: ValeService, 
    private fb: FormBuilder, 
    private router: Router, 
    private activeRouter: ActivatedRoute,
    private comprasService: ComprasService,
    private autorizacionService: AutorizacionService
  ) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.valeId = this.activeRouter.snapshot.paramMap.get('id');
    // this.cargarProveedores();
    this.cargarVehiculos();
    this.cargarCatProgras();

    this.valeService.getSingleVale(this.valeId).subscribe(data => {
      this.dataVale = data;
      console.log(this.dataVale);
      // console.log(this.dataCompra);
      // this.listadeArticulos = this.dataCompra.productos;

      this.editForm.patchValue({
        cantidad: this.dataVale.cantidad,
        precio: this.dataVale.precio,
        catProgra: this.dataVale.catProgra,
        motivo: this.dataVale.autorizacion ? this.dataVale.autorizacion.motivo : this.dataVale.motivo,
        destino: this.dataVale.autorizacion ? this.dataVale.autorizacion.destino : this.dataVale.destino,
        conductor: this.dataVale.autorizacion ? this.dataVale.autorizacion.conductor._id : this.dataVale.conductor._id,
        vehiculo: this.dataVale.autorizacion ? this.dataVale.autorizacion.vehiculo._id : this.dataVale.vehiculo._id,
        fecha: this.dataVale.fecha.substr(0, 10),
        idProducto: this.dataVale.idProducto._id,
      });

    })
  }

  ngOnInit(): void {
  }

  cargarProveedores() {
    this.cargando = true;
    // this.almacenService
    //   .getAllProveedores()
    //   .subscribe((data: any) => {
    //     this.proveedores = data.serverResponse;
    //     // console.log('Proveedores', data);
    //   });
  }


  cargarFuncionarios() {
    this.cargando = true;
    // this.valeService.getAllFuncionarios().subscribe((data: any) => {
    //   this.funcionarios = data.serverResponse;
    //   // console.log("Funcionarios", data)
    // });
  }

  cargarVehiculos() {
    this.autorizacionService.getAllVehiculos()
      .subscribe((data: any) => {
        this.vehiculos = data.serverResponse;
        // console.log('vehiculos', this.vehiculos);
      });
  }

  cargarCatProgras() {
    this.cargando = true;
    this.comprasService.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
      // console.log("Cat Progras", data)
    });
  }

  get form() {
    return this.editForm.controls;
  }

  doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  }

  borrar(event: any) {
    event.target.innerText = '';
  }

  cambio(event: any, i: number, field: string) {

    // console.log("valor", event.target.innerText)
    // console.log("indice", i)
    // console.log("field", field)


    // this.listadeArticulos[i][field] = event.target.innerText;
    // this.editForm.patchValue({
    //   articulos: this.listadeArticulos
    // })

  }

  removeArticulo(index: number) {
    console.log('articleIndex', index)
    // if(index == 0){
    //   this.listadeArticulos.splice(0, 1);
    // }
    this.listadeArticulos.splice(index, 1);
  }

  calculateTotalCost() {
    return this.listadeArticulos.reduce((acc: any, item: any) => acc + (item.precio * item.cantidadCompra), 0);
  }

  cancel() {
    this.router.navigate(['almacen/vale/index']);
  }

  editVale(data: any) {
    console.log(data);
    

    this.valeService.editVale(this.editForm.value, this.valeId).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
        this.router.navigate(['almacen/vale/index']),
          this.alertOk('success', 'Exito', 'Ingreso Editado Correctamente', '2000')
      }
    );

  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.articulos = this.articulosTemp;
      return;
    }

    // if (termino.includes('%')) {
    //   console.log('La cadena contiene el signo "%".');
    // } else {
    //   console.log('La cadena no contiene el signo "%".');
    // }

    // this.valeService.searchArticulo(termino).subscribe((resp) => {
    //   console.log('Resp:', resp);
    //   this.articulos = resp;
    //   if (this.articulos.serverResponse.length == 1) {

    //     this.article = this.articulos.serverResponse[0];

    //     this.addArticulo(this.article)
    //   }
    // });

  }

}
