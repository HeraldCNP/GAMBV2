import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../../services/compras.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-compra-update',
  templateUrl: './compra-update.component.html',
  styleUrls: ['./compra-update.component.css']
})
export class CompraUpdateComponent implements OnInit {
  idUser: any;
  user: any;
  data: any;
  articulos: any;
  articulosTemp: any;
  article: any;
  listadeArticulos: any = [];
  editForm:any;
  proveedorForm:any;
  fechaHoy = new Date().toISOString();
  // fechaHoy:string = "2023/02/02";

  catProgras:any;
  proveedores:any;
  funcionarios:any;
  vehiculos:any;
  cargando: boolean = true;
  gaso: boolean = false;

  constructor(private comprasService: ComprasService, private fb: FormBuilder, private router: Router, private almacenService: AlmacenService) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;

    this.editForm = this.fb.group({
      fecha: [this.fechaHoy.substr(0, 10), [Validators.required]],
      fechaContrato: [''],
      categoriaProgra: ['', [Validators.required]],
      idProveedor: ['', [Validators.required]],
      idPersona: ['', [Validators.required]],
      plazo: [''],
      concepto: ['', [Validators.required, Validators.min(3)]],
      numeroFactura: [''],
      articulos: ['', [Validators.required]],
      vehiculo: [''],
      motivo: [''],
      idUsuario: [this.idUser],
    });
  }

  ngOnInit(): void {
  }

  get form() {
    return this.editForm.controls;
  }

  doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  }

  borrar(event:any){
    event.target.innerText = '';
  }

  cambio(event:any, i:number, field:string){

    // console.log("valor", event.target.innerText)
    // console.log("indice", i)
    // console.log("field", field)


    this.listadeArticulos[i][field] = event.target.innerText;

    this.editForm.patchValue({
      articulos: this.listadeArticulos
    })

  }

  removeArticulo(index: number){
    console.log('articleIndex', index)
    // if(index == 0){
    //   this.listadeArticulos.splice(0, 1);
    // }
    this.listadeArticulos.splice(index, 1);
  }

  calculateTotalCost() {
    return this.listadeArticulos.reduce((acc:any, item:any) => acc + (item.precio * item.cantidadCompra), 0);
  }

  cancel() {
    this.router.navigate(['almacen/articulo/index']);
  }

  editarCompra(form: any){

  }
}
