import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasService } from '../../../services/compras.service';
import { ValeService } from '../../../services/vale.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vale-create',
  templateUrl: './vale-create.component.html',
  styleUrls: ['./vale-create.component.css']
})
export class ValeCreateComponent {
  idUser: any;
  user: any;
  data: any;
  idAutorizacion: any;
  createForm: any;

  catProgras: any;
  compras:any;
  noHayStock: boolean = false;
  compraSingle:any;
  fechaIni = new Date(this.obtenerFechaInicial()).toISOString();
  fechaHoy = new Date().toISOString();

  constructor(
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private comprasService: ComprasService,
    private router: Router,
    private valeService: ValeService
    ) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.idAutorizacion = this.activeRouter.snapshot.paramMap.get('id');

    console.log(this.idAutorizacion);
    

    this.createForm = this.fb.group({ 
      autorizacion: [this.idAutorizacion],
      cantidad: [0],
      precio: [''],
      catProgra: ['', [Validators.required]],
      encargadoControl: [this.idUser],
      idCompra: [''],
      radio: ['no'],
      idProducto: ['', [Validators.required]],
      fecha: [this.fechaHoy.substr(0, 10), [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarCatProgras();
  }

  obtenerFechaInicial() {
    const date = new Date();
    const year = date.getFullYear();
    return `01/01/${year}`;
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
    console.log('Formulario', form);
    
    this.valeService.createVale(form).subscribe(
      (res:any) => {
        console.log(res);
        let params = {estado:'REGISTRADO',conductor: res.serverResponse.conductor, del: this.fechaIni.substr(0, 10), al: this.fechaHoy.substr(0, 10)};
        this.valeService.getAllVales(params).subscribe((data: any) => {
          console.log('Vale', data);
          if(data.serverResponse.length > 1){
            Swal.fire({
              icon: 'warning',
              title: 'Ojo!!!',
              text: 'El conductor debe entregar la útima factura de combustible, el siguiente vale ya le bloqueará el sistema.',
            });
          }
        });
        this.router.navigate(['almacen/vale/index']);
        // this.alertOk('success', 'Vale creado', 'El vale se ha creado correctamente', 2000);
      },
      
      (error) => {
              console.log(error);
              if (error.status === 0) {
                setTimeout(() => {
                  Swal.fire({
                      icon: "error",
                      title: "Error de Conexión",
                      text: "No se puede conectar con el servidor. Por favor, inténtalo más tarde.",
                  });
              }, 15);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'ALTO!!!',
                  text: error.error.serverResponse || 'Ocurrió un error inesperado.',
                });
              }
            }
    );
  }


  doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
    this.valeService.getCompraOfCombustible(this.createForm.value.idProducto, this.createForm.value.catProgra).subscribe((data: any) => {
      if(data.serverResponse.length == 0){
        this.noHayStock = true;
        this.compras = null;
      }
      else{
        this.compras = data.serverResponse;
        this.noHayStock = false;
      }
    });

  }

  cancel() {
    this.router.navigate(['almacen/vale/index'])
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




}
