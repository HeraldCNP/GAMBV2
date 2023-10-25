import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EgresosService } from '../../../services/egresos.service';
import { AlmacenService } from '../../../services/almacen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-egreso-update',
  templateUrl: './egreso-update.component.html',
  styleUrls: ['./egreso-update.component.css']
})
export class EgresoUpdateComponent {
  idUser: any;
  user: any;
  data: any;
  articulos: any;
  article: any;
  articulosTemp: any;
  salidaId: any;
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
  dataSalida: any;
  existe: boolean = false;

  editForm = this.fb.group({
    fecha: [this.fechaHoy.substr(0, 10), [Validators.required]],
    glosaSalida: ['', [Validators.required, Validators.min(3)]],
    idPersona: ['', [Validators.required]],
    articulos: [''],
    entregado: [''],
    cargo: [''],
    idUsuario: [''],
    categoriaProgra: [''],

  });

  constructor(private egresoService: EgresosService, private fb: FormBuilder, private router: Router, private almacenService: AlmacenService, private activeRouter: ActivatedRoute) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.salidaId = this.activeRouter.snapshot.paramMap.get('id');
    // this.cargarProveedores();
    this.cargarFuncionarios();
    this.cargarCatProgras();

    this.egresoService.getSingleSalida(this.salidaId).subscribe(data => {
      this.dataSalida = data;
      console.log(this.dataSalida);

      // this.listadeArticulos = this.dataCompra.productos;

      // console.log(this.dataCompra.productos.length)
      this.editForm.setValue({
        fecha: this.dataSalida.fecha.substr(0, 10),
        glosaSalida: this.dataSalida.glosaSalida,
        idPersona: this.dataSalida.idPersona._id,
        entregado: this.dataSalida.entregado,
        cargo: this.dataSalida.cargo,
        articulos: null,
        idUsuario: null,
        categoriaProgra: null,
      });

      this.dataSalida.productos.forEach((product: any) => {
        console.log("recorriendo", product)
        let productTemp = {
          'idArticulo': product.idCompra.idArticulo._id,
          'catProgra': product.catProgra,
          'partidaGasto': product.idCompra.idArticulo.idPartida.codigo,
          'articulo': product.idCompra.idArticulo.nombre,
          'cantidadCompra': product.idCompra.cantidadCompra,
          'unidadMedida': product.idCompra.idArticulo.unidadDeMedida,
          'precio': product.idCompra.precio,
          'idSalida': product._id
        };
        // console.log("recorriendo2", productTemp)
        this.listadeArticulos.push(productTemp);
      });
    })
  }

  ngOnInit(): void {

  }



  cargarFuncionarios() {
    this.cargando = true;
    this.egresoService.getAllFuncionarios().subscribe((data: any) => {
      this.funcionarios = data.serverResponse;
      // console.log("Funcionarios", data)
    });
  }

  cargarCatProgras() {
    this.cargando = true;
    // this.egresoService.getAllCatProgras().subscribe((data: any) => {
    //   this.catProgras = data.serverResponse;
    //   // console.log("Cat Progras", data)
    // });
  }

  escogido = (value: any) => {
    const elementoEncontrado = this.funcionarios.find((user: { _id: any; }) => user._id == value);
    let funcionario = elementoEncontrado.username +' '+ elementoEncontrado.surnames;
    let cargo = elementoEncontrado.post;

    this.editForm.patchValue({
      entregado: funcionario,
      cargo: cargo
    })
    // this.editForm.value.entregado = funcionario;
    // this.editForm.value.cargo = cargo;
    value ? this.existe = true : this.existe = false;
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
    this.router.navigate(['almacen/egreso/index']);
  }

  editarSalida() {
    this.editForm.patchValue({
      articulos: this.listadeArticulos
    })

    this.egresoService.editSalida(this.editForm.value, this.salidaId).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
        this.router.navigate(['almacen/egreso/index']),
          this.alertOk('success', 'Exito', 'Salida Editada Correctamente', '2000')
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

    // this.egresoService.searchArticulo(termino).subscribe((resp) => {
    //   console.log('Resp:', resp);
    //   this.articulos = resp;
    //   if (this.articulos.serverResponse.length == 1) {

    //     this.article = this.articulos.serverResponse[0];

    //     this.addArticulo(this.article)
    //   }
    // });

  }

  addArticulo(article: any) {
    console.log('articleAdd', article)
    this.listadeArticulos.push({
      idArticulo: article._id,
      codigo: article.codigo,
      catProgra: this.editForm.value.categoriaProgra,
      partidaGasto: article.idPartida.codigo,
      articulo: article.nombre,
      cantidadCompra: 0,
      unidadMedida: article.unidadDeMedida,
      precio: 0
    });
  }
}
