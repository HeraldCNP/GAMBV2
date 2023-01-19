import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-programa-index',
  templateUrl: './programa-index.component.html',
  styleUrls: ['./programa-index.component.css']
})
export class ProgramaIndexComponent implements OnInit {
  totalProgramas: any = 0;
  programas: any = [];
  programasTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 5;
  totalPages: any;
  showModal: boolean = true;
  programaForm: any;
  cargando:boolean = true;
  constructor(
    private almacenService: AlmacenService,
    private fb: FormBuilder,
  ) {
    this.programaForm = this.fb.group({
      codigo: ['', [Validators.required]],
      denominacion: ['', [Validators.required,]],
    })
  }

  ngOnInit(): void {
    this.cargarProgramas();
  }

  get form() {
    return this.programaForm.controls;
  }

  cargarProgramas() {
    this.cargando = true;
    this.almacenService.getAllProgramas(this.limit, this.skip).subscribe((data: any) => {
      this.totalProgramas = data.totalDocs;
      this.programas = data;
      this.programasTemp = data;
      this.totalPages = data.totalpage;
      console.log(data)
      this.cargando = false;
    });
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
    this.cargarProgramas();
  }

  crearPrograma(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.almacenService.createPrograma(form)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.programaForm.reset();
          this.cargarProgramas();
        }
      );
  }

  buscar(termino:string){
    if(termino.length === 0){
      this.programas = this.programasTemp
      return
    }
    this.almacenService.searchPrograma(termino)
    .subscribe(resp => {
      console.log("Resp:", resp)
      this.programas = resp;
    })
  }

  borrarPrograma(id:string){
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
          'El Programa ha sido eliminada.',
          'success'
        )
        this.almacenService.deletePrograma(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.cargarProgramas()
        );
      }
    })
  }

}
