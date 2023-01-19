import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-proyecto-index',
  templateUrl: './proyecto-index.component.html',
  styleUrls: ['./proyecto-index.component.css']
})
export class ProyectoIndexComponent implements OnInit {
  totalProyectos: any = 0;
  proyectos: any = [];
  programas: any = [];
  proyectosTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 5;
  totalPages: any;
  showModal: boolean = true;
  proyectoForm: any;
  cargando:boolean = true;

  constructor(
    private almacenService: AlmacenService,
    private fb: FormBuilder,
  ) {
    this.proyectoForm = this.fb.group({
      codigo: ['', [Validators.required]],
      denominacion: ['', [Validators.required,]],
      id_programa: ['', [Validators.required,]],
    })
  }

  ngOnInit(): void {
    this.cargarProyectos()
    this.cargarProgramas()
  }

  get form() {
    return this.proyectoForm.controls;
  }

  cargarProgramas() {
    this.cargando = true;
    this.almacenService.getAllProgramas().subscribe((data: any) => {
      this.programas = data.serverResponse;
      // console.log("Programas", data)
    });
  }

  public doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  }


  cargarProyectos() {
    this.cargando = true;
    this.almacenService.getAllProyectos(this.limit, this.skip).subscribe((data: any) => {
      this.totalProyectos = data.totalDocs;
      this.proyectos = data;
      this.proyectosTemp = data;
      this.totalPages = data.totalpage;
      console.log(data)
      this.cargando = false;
    });
  }

  crearProyecto(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.almacenService.createProyecto(form)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.proyectoForm.reset();
          this.cargarProyectos();
        }
      );
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
    this.cargarProyectos();
  }

  buscar(termino:string){
    if(termino.length === 0){
      this.proyectos = this.proyectosTemp
      return
    }
    this.almacenService.searchPrograma(termino)
    .subscribe(resp => {
      console.log("Resp:", resp)
      this.proyectos = resp;
    })
  }

  borrarProyecto(id:string){
    Swal.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El Proyecto ha sido eliminado.',
          'success'
        )
        this.almacenService.deletePrograma(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.cargarProyectos()
        );
      }
    })
  }

}
