import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContaService } from '../../../services/conta.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AreaService } from '../../../services/area.service';
import { CarpetaService } from '../../../services/carpeta.service';

@Component({
  selector: 'app-conta-index',
  templateUrl: './conta-index.component.html',
  styleUrls: ['./conta-index.component.css']
})
export class ContaIndexComponent implements OnInit {
  totalCarpetasConta: any = 0;
  carpetas: any = [];
  carpetasTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  contaForm: any;
  editForm: any;
  archiForm: any;
  buscarForm: any;
  cargando: boolean = true;
  idCarpeta: any;
  idCarpeta2: any;
  idCarpetaConta: any;
  area: string = 'contabilidad';
  carpeta: any;
  tipos: string[] = [];
  tipo: string = 'Gastos';
  subTipo: string = '';
  estadoFinan: any;
  URL = environment.api;
  areas: any;
  archivosSin: any;

  constructor(private fb: FormBuilder, private contaService: ContaService, private router: Router, private areaService: AreaService, private carpetaService: CarpetaService) {
    this.contaForm = this.fb.group({
      numero: [''],
      detalle: ['', [Validators.required]],
      beneficiario: [''],
      fecha: [''],
      monto: [''],
      fojas: ['', [Validators.required]],
      observacion: [''],
      idCarpeta: [''],
    });

    this.archiForm = this.fb.group({
      archivo: [''],
    })


    this.editForm = this.fb.group({
      gestion: ['', [Validators.required]],
      area: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      numCarpeta: ['', [Validators.required]],
      nameCarpeta: ['', [Validators.required]],
      lugar: [''],
      estante: ['', [Validators.required]],
      fila: [''],
    });

    this.buscarForm = this.fb.group({
      numero: [''],
      glosa: [''],
      beneficiario: [''],
      ci: ['']
    });
  }

  ngOnInit(): void {
    this.cargarCarpetasConta();
    this.cargarAreas()
  }

  cargarCarpetasConta() {
    this.cargando = true;
    this.contaService.getAllConta(this.limit, this.skip, this.area, this.tipo, this.subTipo)
      .subscribe((data: any) => {
        this.totalCarpetasConta = data.totalDocs;
        this.carpetas = data;
        this.carpetasTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }



  get form() {
    return this.contaForm.controls;
  }

  get form2() {
    return this.editForm.controls;
  }

  get form3() {
    return this.archiForm.controls;
  }

  get form4() {
    return this.buscarForm.controls;
  }





  cargarDataEdit(carpeta: any) {
    this.carpeta = carpeta;
    let search = this.areas.find((x: { nombre: any; }) => x.nombre == carpeta.area);
    this.tipos = search.tipos;
    this.editForm.setValue({
      gestion: carpeta.gestion,
      area: carpeta.area,
      tipo: carpeta.tipo,
      numCarpeta: carpeta.numCarpeta,
      nameCarpeta: carpeta.nameCarpeta,
      lugar: carpeta.lugar,
      estante: carpeta.estante,
      fila: carpeta.fila,
    });
    this.idCarpeta = carpeta._id;
  }


  buscar(termino: string) {
    if (termino.length === 0) {
      this.carpetas = this.carpetasTemp;
      return;
    }
    // this.almacenService.searchProveedor(termino).subscribe((resp) => {
    //   console.log('Resp:', resp);
    //   this.proveedores = resp;
    //   this.proveedoresTemp = resp;
    // });
  }

  cambiarPagina(valor: number) {
    this.skip += valor;
    this.page += valor;
    if (this.page < 0) {
      this.skip = 0;
    } else if (this.page > this.totalPages) {
      this.skip -= valor;
      this.page -= valor;
    }
    this.cargarCarpetasConta();
  }

  borrarCarpeta(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto! Se eliminaran todos los archivos registrados dentro de esta carpeta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Eliminado!', 'La Carpeta ha sido eliminada.', 'success');
        this.carpetaService.deleteCarpeta(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarCarpetasConta()
        );
      }
    });
  }

  editCarpeta(form: any) {
    this.carpetaService.editCarpeta(form, this.idCarpeta).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log('HTTP Error', err);
      },
      () => {
        this.editForm.reset();
        this.alertOk(
          'success',
          'Exito',
          'Articulo editado Correctamente',
          '2000'
        );
        this.cargarCarpetasConta();
      }
    );
  }

  crearConta(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.contaService.createConta(form, this.idCarpetaConta).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.contaForm.reset();
        this.alertOk(
          'success',
          'Exito',
          'Documento Registrado Correctamente',
          '2000'
        );
        this.cargarCarpetasConta();
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

  resetForm() {
    this.contaForm.reset();
    this.buscarForm.reset();
  }

  addCarpetaId(carpeta: any) {
    switch (carpeta.tipo) {
      case 'Gastos':
        if (carpeta.subTipo == 'cip') {
          this.router.navigate(['archivos/conta/docs/preven', carpeta._id])
        } else {
          this.router.navigate(['archivos/conta/docs/deven', carpeta._id])
        }
        console.log(carpeta);

        break;

      case 'Recursos':
        console.log(carpeta);
        if (carpeta.subTipo == 'cip') {
          this.router.navigate(['archivos/conta/docs/recursos/deven', carpeta._id])
        } else {
          this.router.navigate(['archivos/conta/docs/recursos/sip', carpeta._id])
        }

        break;

      case 'Estados Financieros':
        console.log(carpeta);
        this.router.navigate(['archivos/conta/docs/finan', carpeta._id])
        break;

      default:
        break;
    }
  }

  // verDocumentos(carpeta: any) {
  //   this.contaService.getSingleCarpeta(carpeta._id).subscribe(
  //     (res) => {
  //       this.carpeta = res.serverResponse;
  //       // console.log(this.carpeta);
  //     },
  //     (err) => console.log('HTTP Error', err),
  //     () => {

  //     }
  //   );
  // }

  verArchivos(carpeta: any) {
    switch (carpeta.tipo) {
      case 'Gastos':
        // console.log(carpeta);

        if (carpeta.subTipo == 'cip') {
          this.router.navigate(['archivos/conta/docs/preven/list', carpeta._id])
        } else {
          this.router.navigate(['archivos/conta/docs/deven/list', carpeta._id])
        }
        break;

      case 'Recursos':
        console.log(carpeta);
        if (carpeta.subTipo == 'cip') {
          this.router.navigate(['archivos/conta/docs/recursos/deven/list', carpeta._id])
        } else {
          this.router.navigate(['archivos/conta/docs/recursos/sip/list', carpeta._id])
        }
        break;

      case 'Estados Financieros':
        console.log(carpeta);
        this.router.navigate(['archivos/conta/docs/finan/list', carpeta._id])
        break;

      default:
        break;
    }
  }

  changeStatus(status: any, subTipo: string) {
    console.log(status);

    this.tipo = status;
    this.subTipo = subTipo;
    this.cargarCarpetasConta();
    this.skip = 1;
  }


  public doSelect = (value: any) => {
    // console.log('SingleDemoComponent.doSelect', value);
    let search = this.areas.find((x: { nombre: any; }) => x.nombre == value);
    this.tipos = search.tipos;
    console.log(this.tipos);

    // this.user = this.users.find((item: { post: string; }) => item.post === value);
    // console.log(this.user)
  };


  cargarAreas() {
    this.areaService.getAllAreas()
      .subscribe((data: any) => {
        this.areas = data.serverResponse;
        // console.log(this.areas);
      });
  }



  cargarArchivosSin() {
    this.contaService.getAllArchivosSin()
      .subscribe((data: any) => {
        this.archivosSin = data;
        console.log(this.archivosSin);
      });
  }

  cargarArchi(id: string) {
    this.cargarArchivosSin();
    this.idCarpeta2 = id;
  }


  cambiarCarpeta(form: any) {
    Swal.fire({
      title: 'Deseas Mover este archivo?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, Mover!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Eliminado!', 'El Archivo se movió con exito.', 'success');
        this.contaService.addArchivo(form, this.idCarpeta2).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarCarpetasConta()
        );
      }
    });
  }


  obtener(form:any){

    let area:string = 'Contabilidad';
    let tipo:string = 'Gastos';
    let subTipo:string = 'cip';
    let gestion:number = form.value.gestion;
    let glosa:string = form.value.glosa;
    let beneficiario:string = form.value.beneficiario;
    let numero:string = form.value.numero;
    let ci:string = form.value.ci;

    this.contaService.buscarArchivos(area, tipo, subTipo, gestion, glosa, beneficiario, numero, ci).subscribe(
      (res:any) => {
        // console.log(res);

        this.archivosSin = res.serverResponse;
        console.log(this.archivosSin);

      },
      (err) => console.log('HTTP Error', err),
      () => {

      }
    );
  }

}
