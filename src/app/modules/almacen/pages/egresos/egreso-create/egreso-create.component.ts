import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComprasService } from '../../../services/compras.service';
import { EgresosService } from '../../../services/egresos.service';

@Component({
  selector: 'app-egreso-create',
  templateUrl: './egreso-create.component.html',
  styleUrls: ['./egreso-create.component.css']
})
export class EgresoCreateComponent implements OnInit {
  idUser: any;
  user: any;
  data: any;
  salidaForm: any;
  demoForm: any;
  fechaHoy = new Date().toISOString();
  catProgras: any;
  funcionarios: any;
  cargando: boolean = true;
  articulos: any;
  articulosTemp: any;
  article: any;
  articles: any;
  compras: any;
  listadeArticulos: any = [];
  compraSingle:any;

  constructor(private comprasService: ComprasService, private fb: FormBuilder, private router: Router, private egresosService: EgresosService) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.salidaForm = this.fb.group({
      fecha: [this.fechaHoy.substr(0, 10), [Validators.required]],
      // categoriaProgra: ['', [Validators.required]],
      concepto: ['', [Validators.required]],
      idPersona: ['', [Validators.required]],
      articulos: ['', [Validators.required]],
      idUsuario: [this.idUser],
    });

    this.demoForm = this.fb.group({
      article: ['', [Validators.required]],
      entrada: ['', [Validators.required]],
      cantidadSalida: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarArticulos();
    this.cargarFuncionarios();
  }


  get form() {
    return this.salidaForm.controls;
  }

  get form2() {
    return this.demoForm.controls;
  }

  cargarFuncionarios() {
    this.cargando = true;
    this.comprasService.getAllFuncionarios().subscribe((data: any) => {
      this.funcionarios = data.serverResponse;
      console.log("Funcionarios", data)
    });
  }

  cargarCatProgras() {
    this.cargando = true;
    this.comprasService.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
      console.log("Cat Progras", data)
    });
  }

  cargarArticulos() {
    this.cargando = true;
    this.egresosService.getAllArticulos().subscribe((data: any) => {
      this.articles = data.serverResponse;
      console.log("All Articulos", this.articles)
    });
  }

  doSelect = (id: any) => {
    console.log('SingleDemoComponent.doSelect', id);
    this.egresosService.getCompraOfArticulo(id).subscribe((data: any) => {
      if(data.serverResponse.length > 0){
        this.compras = data.serverResponse;
        console.log("Compras que esta un articulo", this.compras)
      }
    });
  }

  doSelect2 = (id: any) => {
    this.compraSingle = this.compras.find((objeto:any)=> objeto._id === id);
    console.log('compraSingle', this.compraSingle);
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

  calcularStock(){
    if(this.demoForm.value.cantidadSalida > this.compraSingle.stockCompra){
      Swal.fire('La Cantidad de salida es mayor al stock')
      this.demoForm.value.cantidadSalida = 0;
    }

  }

  addSalida(compra: any) {
    console.log('compra', compra)
    this.listadeArticulos.push({
      idCompra: compra._id,
      codigo: compra.idArticulo.codigo,
      catProgra: compra.catProgra,
      partidaGasto: compra.idArticulo.idPartida.codigo,
      articulo: compra.idArticulo.nombre,
      cantidadSalida: this.demoForm.value.cantidadSalida,
      unidadMedida: compra.idArticulo.unidadDeMedida,
      precio: compra.precio
    });

    this.salidaForm.patchValue({
      articulos: this.listadeArticulos
    })

    this.demoForm.reset();
  }

  addArticulo(article: any) {
    console.log('articleAdd', article)
    this.listadeArticulos.push({
      id: article._id,
      codigo: article.codigo,
      catProgra: this.salidaForm.value.categoriaProgra,
      partidaGasto: article.idPartida.codigo,
      articulo: article.nombre,
      cantidad: 0,
      unidadMedida: article.unidadDeMedida,
      precio: 0
    });
  }

  borrar(event: any) {
    event.target.innerText = '';
  }

  cambio(event: any, i: number, field: string) {

    // console.log("valor", event.target.innerText)
    // console.log("indice", i)
    // console.log("field", field)


    this.listadeArticulos[i][field] = event.target.innerText;

    this.salidaForm.patchValue({
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
    return this.listadeArticulos.reduce((acc: any, item: any) => acc + (item.precio * item.cantidadSalida), 0);
  }

  cancel() {
    this.router.navigate(['almacen/articulo/index']);
  }

  registrarSalida(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.egresosService.createEgresoIndividual(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {

        this.router.navigate(['almacen/egreso/index']);
        this.alertOk(
          'success',
          'Exito',

          'Salida Creada Correctamente',
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
