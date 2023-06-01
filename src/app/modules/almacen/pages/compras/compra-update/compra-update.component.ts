import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../../services/compras.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenService } from '../../../services/almacen.service';
import Swal from 'sweetalert2';

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
  article: any;
  articulosTemp: any;
  compraId: any;
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
  dataCompra: any;

  editForm = this.fb.group({
    fecha: [this.fechaHoy.substr(0, 10), [Validators.required]],
    fechaContrato: [''],
    categoriaProgra: [''],
    idProveedor: ['', [Validators.required]],
    idPersona: ['', [Validators.required]],
    plazo: [''],
    concepto: ['', [Validators.required, Validators.min(3)]],
    numeroFactura: [''],
    articulos: [''],
    vehiculo: [''],
    motivo: [''],
    idUsuario: [''],
  });

  constructor(private comprasService: ComprasService, private fb: FormBuilder, private router: Router, private almacenService: AlmacenService, private activeRouter: ActivatedRoute) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.compraId = this.activeRouter.snapshot.paramMap.get('id');
    this.cargarProveedores();
    this.cargarFuncionarios();
    this.cargarCatProgras();

    this.comprasService.getSingleCompra(this.compraId).subscribe(data => {
      this.dataCompra = data;
      console.log(data);
      // console.log(this.dataCompra);
      // this.listadeArticulos = this.dataCompra.productos;

      console.log(this.dataCompra.productos.length)



      this.editForm.setValue({
        fecha: this.dataCompra.fecha.substr(0, 10),
        fechaContrato: this.dataCompra.fechaContrato.substr(0, 10),
        idProveedor: this.dataCompra.idProveedor._id,
        idPersona: this.dataCompra.idPersona._id,
        plazo: this.dataCompra.plazo,
        concepto: this.dataCompra.concepto,
        articulos: null,
        idUsuario: null,
        categoriaProgra: null,
        numeroFactura: null,
        vehiculo: null,
        motivo: null
      });

      this.dataCompra.productos.forEach((product: any) => {
        console.log("recorriendo", product)
        let productTemp = {
          'idArticulo': product.idArticulo._id,
          'codigo': product.idArticulo.codigo,
          'catProgra': product.catProgra,
          'partidaGasto': product.idArticulo.idPartida.codigo,
          'factura': product.factura,
          'articulo': product.idArticulo.nombre,
          'cantidadCompra': product.cantidadCompra,
          'unidadMedida': product.idArticulo.unidadDeMedida,
          'precio': product.precio,
          'idCompra': product._id
        };
        // console.log("recorriendo2", productTemp)
        this.listadeArticulos.push(productTemp);
      });
    })
  }

  ngOnInit(): void {
  }

  cargarProveedores() {
    this.cargando = true;
    this.almacenService
      .getAllProveedores()
      .subscribe((data: any) => {
        this.proveedores = data.serverResponse;
        // console.log('Proveedores', data);
      });
  }

  cargarFuncionarios() {
    this.cargando = true;
    this.comprasService.getAllFuncionarios().subscribe((data: any) => {
      this.funcionarios = data.serverResponse;
      // console.log("Funcionarios", data)
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


    this.listadeArticulos[i][field] = event.target.innerText;
    this.editForm.patchValue({
      articulos: this.listadeArticulos
    })

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
    this.router.navigate(['almacen/articulo/index']);
  }

  editarCompra() {
    this.editForm.patchValue({
      articulos: this.listadeArticulos
    })

    this.comprasService.editIngreso(this.editForm.value, this.compraId).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
        this.router.navigate(['almacen/compra/index']),
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

    this.comprasService.searchArticulo(termino).subscribe((resp) => {
      console.log('Resp:', resp);
      this.articulos = resp;
      if (this.articulos.serverResponse.length == 1) {

        this.article = this.articulos.serverResponse[0];

        this.addArticulo(this.article)
      }
    });

  }

  addArticulo(article: any) {
    console.log('articleAdd', article)
    this.listadeArticulos.push({
      idArticulo: article._id,
      codigo: article.codigo,
      catProgra: this.editForm.value.categoriaProgra,
      partidaGasto: article.idPartida.codigo,
      factura: this.editForm.value.numeroFactura,
      articulo: article.nombre,
      cantidadCompra: 0,
      unidadMedida: article.unidadDeMedida,
      precio: 0
    });
  }

}
