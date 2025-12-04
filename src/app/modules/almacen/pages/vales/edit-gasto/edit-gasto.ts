import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ValeService } from '../../../services/vale.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasService } from '../../../services/compras.service';
import { AutorizacionService } from 'src/app/modules/act-fijos/services/autorizacion.service';
import Swal from 'sweetalert2';
import { DesembolsoService } from 'src/app/modules/desembolso/services/desembolso.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ConvenioService } from 'src/app/modules/convenio/services/convenio.service';

@Component({
  selector: 'app-edit-gasto',
  templateUrl: './edit-gasto.html',
  styleUrl: './edit-gasto.css',
})
export class EditGasto {
  idUser: any;
  user: any;
  data: any;
  articulos: any;
  article: any;
  articulosTemp: any;
  gastoId: any;
  listadeArticulos: any = [];
  proveedorForm: any;
  params: any = {};
  tipoFondos: any = [];
  fechaHoy = new Date().toISOString();
  // fechaHoy:string = "2023/02/02";

  gastoFondos: any = [];
  catProgras: any;
  proveedores: any;
  funcionarios: any;
  vehiculos: any;
  cargando: boolean = true;
  gaso: boolean = false;
  dataGasto: any;
fuentes: any = [];
partidas: any = [];
  editForm = this.fb.group({
    // cantidad: [0],
    montoGasto: ['', Validators.required],
    catProgra: ['', [Validators.required]],
    idSolicitante: ['', [Validators.required]],
    idVehiculo: [''],
    fecha: [this.fechaHoy.substr(0, 10), [Validators.required]],
    idTipoGasto: ['', [Validators.required]],
    idFuente: ['', [Validators.required]],
    idPartida: ['', [Validators.required]],
    descripcion: [''],
  });

  constructor(
    private valeService: ValeService,
    private gastoService: DesembolsoService,
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private comprasService: ComprasService,
    private autorizacionService: AutorizacionService,
    private authService: AuthService,
    private partida: ConvenioService
  ) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.gastoId = this.activeRouter.snapshot.paramMap.get('id');
    // this.cargarProveedores();
    this.params = { isActive: true };
    this.cargarVehiculos();
    this.cargarCatProgras();
    this.cargarFuncionarios(this.params);
    this.cargarTipoFondos();
    this.cargarGastosFondos();
    this.cargarFuentes();
    this.getPartidas();
    this.gastoService.getSingleGasto(this.gastoId).subscribe(data => {
      this.dataGasto = data;
      console.log("gasto", this.dataGasto);
      // console.log(this.dataCompra);
      // this.listadeArticulos = this.dataCompra.productos;

      this.editForm.patchValue({
        // cantidad: this.dataGasto.gestion,
        montoGasto: this.dataGasto.montoGasto,
        catProgra: this.dataGasto.catProgra,
        //motivo: this.dataGasto.autorizacion ? this.dataGasto.autorizacion.motivo : this.dataGasto.motivo,
        // destino: this.dataGasto.autorizacion ? this.dataGasto.autorizacion.destino : this.dataGasto.destino,
        idSolicitante: this.dataGasto.idSolicitante?._id ?? '',
        idVehiculo: this.dataGasto.idVehiculo?._id ?? '',
        fecha: this.dataGasto.fechaRegistro.substr(0, 10),
        idTipoGasto: this.dataGasto.idTipoGasto?._id ?? '',
        idFuente: this.dataGasto.idFuente?._id ?? '',
        idPartida: this.dataGasto.idPartida?._id ?? '',
        descripcion: this.dataGasto.descripcion ?? '',
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

  cargarFuncionarios(params?: any) {
    //params.isActive= true;
    this.authService.listUsers(params).subscribe((data: any) => {
      this.funcionarios = data.serverResponse;
    });
  }

  cargarTipoFondos() {
    this.gastoService.getTipoFondos().subscribe((data: any) => {
      this.tipoFondos = data;
    });
  }
   cargarGastosFondos() {
    this.gastoService.getGastosFondos().subscribe((data: any) => {
      this.gastoFondos = data;
    });
  }
  
   cargarFuentes() {
    this.gastoService.getFuentes().subscribe((data: any) => {
      console.log('fuentes', data);
      this.fuentes = data;
    });
  }
  getPartidas() {
    this.partida.getAllPartidas().subscribe((data) => {
      this.partidas = data;
      // console.log("partidas", this.partidas)
      // console.log("partidas", data)
    });
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
    this.router.navigate(['almacen/gastos']);
  }

  editGasto(data: any) {
    console.log(data);


    this.valeService.editGasto(this.editForm.value, this.gastoId).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
        this.router.navigate(['almacen/gastos']),
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
