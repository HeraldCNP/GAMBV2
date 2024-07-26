import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComprasService } from '../../../services/compras.service';
import { ValeService } from '../../../services/vale.service';
import { AutorizacionService } from 'src/app/modules/act-fijos/services/autorizacion.service';

@Component({
  selector: 'app-vale-new',
  templateUrl: './vale-new.component.html',
  styleUrls: ['./vale-new.component.css']
})
export class ValeNewComponent {

  idUser: any;
  user: any;
  data: any;
  idAutorizacion: any;
  createForm: any;

  catProgras: any;
  compras:any;
  noHayStock: boolean = false;
  compraSingle:any;

  unidades: any;
  vehiculos: any;
  conductores: any;

  constructor(
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private comprasService: ComprasService,
    private router: Router,
    private valeService: ValeService,
    private autorizacionService: AutorizacionService
    ) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.idAutorizacion = this.activeRouter.snapshot.paramMap.get('id');

    console.log(this.idAutorizacion);

    this.createForm = this.fb.group({
      autorizacion: [this.idAutorizacion],
      cantidad: ['', [Validators.required]],
      catProgra: ['', [Validators.required]],
      encargadoControl: [this.idUser],
      motivo: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      // unidadSolicitante: ['', [Validators.required]],
      conductor: ['', [Validators.required]],
      vehiculo: [''],
      fecha: [''],
      idProducto: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarCatProgras();
    this.cargarUnidadSolicitante();
    this.cargarConductor();
    this.cargarVehiculo();
  }


  cargarCatProgras() {
    this.comprasService.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
      console.log("Cat Progras", this.catProgras)
    });
  }

  get form() {
    return this.createForm.controls;
  }


  crearVale(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.valeService.createVale(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {

        this.router.navigate(['almacen/vale/index']);
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


  doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
    this.valeService.getCompraOfCombustible(this.createForm.value.idProducto, this.createForm.value.catProgra).subscribe((data: any) => {
      if(data.serverResponse.length == 0){
        this.noHayStock = true;
      }
      else{
        this.compras = data.serverResponse;
        this.noHayStock = false;
      }
    });

  }

  cancel() {
    this.router.navigate(['actFijos/autorizacion/index'])
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
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

  cargarUnidadSolicitante() {
    this.autorizacionService.getAllUnidadSolicitante()
      .subscribe((data: any) => {
        this.unidades = data;
        console.log('uniSolicitante', this.unidades);
      });
  }

  cargarConductor() {
    this.autorizacionService.getAllConductores()
      .subscribe((data: any) => {
        this.conductores = data.serverResponse;
        console.log('conductores', this.conductores);
      });
  }

  cargarVehiculo() {
    this.autorizacionService.getAllVehiculos()
      .subscribe((data: any) => {
        this.vehiculos
        = data.serverResponse;
        console.log('vehiculos', this.vehiculos);
      });
  }

}
