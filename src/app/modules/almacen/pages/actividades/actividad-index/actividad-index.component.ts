import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-actividad-index',
  templateUrl: './actividad-index.component.html',
  styleUrls: ['./actividad-index.component.css']
})
export class ActividadIndexComponent implements OnInit {
  totalActividades: any = 0;
  actividades: any = [];
  programas: any = [];
  actividadesTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 5;
  totalPages: any;
  showModal: boolean = true;
  actividadForm: any;
  cargando:boolean = true;

  constructor(
    private almacenService: AlmacenService,
    private fb: FormBuilder,
  ) {
    this.actividadForm = this.fb.group({
      codigo: ['', [Validators.required]],
      denominacion: ['', [Validators.required,]],
      id_programa: ['', [Validators.required,]],
    })
  }

  ngOnInit(): void {
    this.cargarActividades()
    this.cargarProgramas()
  }

  get form() {
    return this.actividadForm.controls;
  }

  public doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  }

  cargarProgramas() {
    this.cargando = true;
    this.almacenService.getAllProgramas().subscribe((data: any) => {
      this.programas = data.serverResponse;
      // console.log("Programas", data)
    });
  }

  cargarActividades() {
    this.cargando = true;
    this.almacenService.getAllActividades(this.limit, this.skip).subscribe((data: any) => {
      this.totalActividades = data.totalDocs;
      this.actividades = data;
      this.actividadesTemp = data;
      this.totalPages = data.totalpage;
      console.log(data)
      this.cargando = false;
    });
  }

  crearActividad(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.almacenService.createActividad(form)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.actividadForm.reset();
          this.cargarActividades();
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
    this.cargarActividades();
  }

  buscar(termino:string){
    if(termino.length === 0){
      this.actividades = this.actividadesTemp
      return
    }
    this.almacenService.searchActividad(termino)
    .subscribe(resp => {
      console.log("Resp:", resp)
      this.actividades = resp;
    })
  }
  borrarActividad(id:string){
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
          'La Actividad ha sido eliminada.',
          'success'
        )
        this.almacenService.deleteActividad(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.cargarActividades()
        );
      }
    })
  }
}
