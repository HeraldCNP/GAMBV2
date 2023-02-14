import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComprasService } from '../../../services/compras.service';

@Component({
  selector: 'app-compra-create',
  templateUrl: './compra-create.component.html',
  styleUrls: ['./compra-create.component.css']
})
export class CompraCreateComponent implements OnInit {
  idUser: any;
  user: any;
  data: any;
  articulos: any;
  articulosTemp: any;
  article: any;
  listadeArticulos: any = [];
  compraForm:any;
  fechaHoy = new Date().toISOString();
  // fechaHoy:string = "2023/02/02";

  catProgras:any;
  proveedores:any;
  funcionarios:any;
  cargando: boolean = true;

  constructor(private comprasService: ComprasService, private fb: FormBuilder, private router: Router) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    // console.log(this.fechaHoy.substr(0, 10))
    this.compraForm = this.fb.group({
      fecha: [this.fechaHoy.substr(0, 10), [Validators.required]],
      categoriaProgra: ['', [Validators.required]],
      idProveedor: ['', [Validators.required]],
      idPersona: ['', [Validators.required]],
      concepto: ['', [Validators.required, Validators.min(3)]],
      numeroFactura: [''],
      articulos: ['', [Validators.required]],
      idUsuario: [this.idUser],
    });
  }




  ngOnInit(): void {
    this.cargarCatProgras();
    this.cargarProveedores();
    this.cargarFuncionarios();
  }

  cargarCatProgras() {
    this.cargando = true;
    this.comprasService.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
      console.log("Cat Progras", data)
    });
  }

  cargarProveedores() {
    this.cargando = true;
    this.comprasService.getAllProveedores().subscribe((data: any) => {
      this.proveedores = data.serverResponse;
      console.log("Proveedores", data)
    });
  }

  cargarFuncionarios() {
    this.cargando = true;
    this.comprasService.getAllFuncionarios().subscribe((data: any) => {
      this.funcionarios = data.serverResponse;
      console.log("Funcionarios", data)
    });
  }

  addArticulo(article: any) {
    console.log('articleAdd', article)
    this.listadeArticulos.push({
      id: article._id,
      codigo: article.codigo,
      catProgra: this.compraForm.value.categoriaProgra,
      partidaGasto: article.idPartida.codigo,
      factura: this.compraForm.value.numeroFactura,
      articulo: article.nombre,
      cantidad: 0,
      unidadMedida: article.unidadDeMedida,
      precio: 0
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.articulos = this.articulosTemp;
      return;
    }
    this.comprasService.searchArticulo(termino).subscribe((resp) => {
      console.log('Resp:', resp);
      this.articulos = resp;
      if (this.articulos.serverResponse.length == 1) {

        this.article = this.articulos.serverResponse[0];

        this.addArticulo(this.article)
      }
    });

  }

  removeArticulo(index: number){
    console.log('articleIndex', index)
    // if(index == 0){
    //   this.listadeArticulos.splice(0, 1);
    // }
    this.listadeArticulos.splice(index, 1);
  }

  doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  }

  cambio(event:any, i:number, field:string){

    // console.log("valor", event.target.innerText)
    // console.log("indice", i)
    // console.log("field", field)


    this.listadeArticulos[i][field] = event.target.innerText;

    this.compraForm.patchValue({
      articulos: this.listadeArticulos
    })

  }

  borrar(event:any){
    event.target.innerText = '';
  }

  get form() {
    return this.compraForm.controls;
  }

  cancel() {
    this.router.navigate(['almacen/articulo/index']);
  }

  calculateTotalCost() {
    return this.listadeArticulos.reduce((acc:any, item:any) => acc + (item.precio * item.cantidad), 0);
  }


  registrarCompra(form: any) {

    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.comprasService.createIngreso(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {

        this.router.navigate(['almacen/compra/index']);
        this.alertOk(
          'success',
          'Exito',
          'Ingreso Creado Correctamente',
          '2000'
        );
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







}



