import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaService } from 'src/app/modules/archivos/services/conta.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deven-list',
  templateUrl: './deven-list.component.html',
  styleUrls: ['./deven-list.component.css']
})
export class DevenListComponent implements OnInit {
  totalDevengados: any = 0;
  devengados: any = [];
  devengadosTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  cargando: boolean = true;
  carpeta:any;
  carpetaId?:any;
  buscarForm: any;
  folder:any;

  URL = environment.api;

  constructor(private contaService: ContaService, private activeRouter: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.buscarForm = this.fb.group({
      gestion: [2023],
      numero: [''],
      glosa: [''],
      beneficiario: [''],
      ci: ['']
    });
  }

  ngOnInit(): void {
    this.carpetaId = this.activeRouter.snapshot.paramMap.get('id');
    // console.log(this.carpetaId);

    this.cargarDevengados();
  }

  get form() {
    return this.buscarForm.controls;
  }

  obtener(form:any){

    let area:string = 'Contabilidad';
    let tipo:string = 'Gastos';
    let subTipo:string = 'sip';
    let gestion:number = form.value.gestion;
    let glosa:string = form.value.glosa;
    let beneficiario:string = form.value.beneficiario;
    let numero:string = form.value.numero;
    let ci:string = form.value.ci;

    this.contaService.buscarArchivos(area, tipo, subTipo, gestion, glosa, beneficiario, numero, ci).subscribe(
      (res:any) => {
        // console.log(res);

        this.devengados = res.serverResponse;
        this.totalDevengados = res.total;
        this.cargando = false;
        console.log(this.devengados);

      },
      (err) => console.log('HTTP Error', err),
      () => {

      }
    );
  }


  cargarDevengados() {
    this.cargando = true;
    this.contaService.getSingleCarpeta(this.carpetaId).subscribe(
      (res) => {
        this.devengados = res.serverResponse.areaContabilidad;
        this.totalDevengados = res.serverResponse.areaContabilidad.length;
        console.log(this.devengados);
        this.cargando = false;
      },
      (err) => console.log('HTTP Error', err),
      () => {

      }
    );

    // this.contaService.getAllConta(this.limit, this.skip)
    //   .subscribe((data: any) => {
    //     this.totalPreventivos = data.serverResponse.length;
    //     this.preventivos = data;
    //     this.preventivosTemp = data;
    //     this.totalPages = data.totalpage;
    //     console.log(data);
    //     this.cargando = false;
    //   });
  }

  editarDevengado(devengado:any){
    console.log(devengado);
    this.router.navigate(['archivos/conta/docs/deven/edit', devengado._id])
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.devengados = this.devengadosTemp;
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
    this.cargarDevengados();
  }

  borrarArchivo(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Eliminado!', 'El Archivo ha sido eliminado.', 'success');
        this.contaService.deleteArchivo(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarDevengados()
        );
      }
    });
  }

  moverCarpeta(archivoId:string){
    console.log("carpeta", this.carpetaId);
    console.log("archivo", archivoId);
    let idAr = {idArchivo:archivoId}
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
        this.contaService.moverArchivo(idAr, this.carpetaId).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarDevengados()
        );
      }
    });

  }

  verCarpeta(id:any){


    this.folder = this.devengados.filter((element: any) => element._id == id);

    console.log(this.folder[0].idCarpeta[0].area);

  }
}
