import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-proveedor-index',
  templateUrl: './proveedor-index.component.html',
  styleUrls: ['./proveedor-index.component.css']
})
export class ProveedorIndexComponent implements OnInit {
  totalProveedores: any = 0;
  proveedores: any = [];
  programas: any = [];
  proveedoresTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 5;
  totalPages: any;
  showModal: boolean = true;
  proveedorForm: any;
  cargando:boolean = true;

  constructor(
    private almacenService: AlmacenService,
    private fb: FormBuilder,
  ) {
    this.proveedorForm = this.fb.group({
      compania: [''],
      representante: ['', [Validators.required]],
      razon_social: ['', [Validators.required,]],
      nit: ['', [Validators.required,]],
      telefono: ['', [Validators.required,]],
      direccion: [''],
      ciudad: [''],
      estado: ['', [Validators.required,]],
      usuario: ['', [Validators.required,]],
    })
  }

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.cargando = true;
    this.almacenService.getAllProveedores(this.limit, this.skip).subscribe((data: any) => {
      this.totalProveedores = data.totalDocs;
      this.proveedores = data;
      this.proveedoresTemp = data;
      this.totalPages = data.totalpage;
      console.log(data)
      this.cargando = false;
    });
  }

  public doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  }

  crearProveedor(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.almacenService.createProveedor(form)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.proveedorForm.reset();
          this.cargarProveedores();
        }
      );
  }

  resetForm(){
    this.proveedorForm.reset();
  }

  buscar(termino:string){
    if(termino.length === 0){
      this.proveedores = this.proveedoresTemp
      return
    }
    this.almacenService.searchProveedor(termino)
    .subscribe(resp => {
      console.log("Resp:", resp)
      this.proveedores = resp;
    })
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
    this.cargarProveedores();
  }

  borrarProveedor(id:string){
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
        this.almacenService.deleteProveedor(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.cargarProveedores()
        );
      }
    })
  }

}
