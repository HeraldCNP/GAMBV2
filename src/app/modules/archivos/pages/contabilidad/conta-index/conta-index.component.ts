import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContaService } from '../../../services/conta.service';

@Component({
  selector: 'app-conta-index',
  templateUrl: './conta-index.component.html',
  styleUrls: ['./conta-index.component.css']
})
export class ContaIndexComponent implements OnInit {
  totalCarpetas: any = 0;
  carpetas: any = [];
  carpetasTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  carpetaForm: any;
  editForm: any;
  cargando: boolean = true;
  idCarpeta: any;
  area: string = 'contabilidad';

  constructor(private fb: FormBuilder, private contaService: ContaService) {

    this.carpetaForm = this.fb.group({
      gestion: ['', [Validators.required]],
      objeto: ['', [Validators.required]],
      tomo: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      lugar: [''],
      ubicacion: [''],
      area: [''],
      tipo: [''],
      archivo: [''],
      observaciones: [''],
      usuario: [''],
    });

    this.editForm = this.fb.group({
      gestion: ['', [Validators.required]],
      objeto: ['', [Validators.required]],
      tomo: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      lugar: [''],
      ubicacion: [''],
      area: [''],
      tipo: [''],
      archivo: [''],
      observaciones: [''],
      usuario: [''],
    });
  }

  ngOnInit(): void {
    this.cargarCarpetas();
  }


  cargarCarpetas() {
    this.cargando = true;
    this.contaService.getAllCarpetas(this.limit, this.skip, this.area)
      .subscribe((data: any) => {
        this.totalCarpetas = data.totalDocs;
        this.carpetas = data;
        this.carpetasTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  public doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  };

  crearProveedor(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    // this.almacenService.createProveedor(form).subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => console.log('HTTP Error', err),
    //   () => {
    //     this.proveedorForm.reset();
    //     this.cargarProveedores();
    //   }
    // );
  }

  resetForm() {
    this.carpetaForm.reset();
  }

  cargarDataEdit(proveedor: any) {
    // console.log("idProve", proveedor.representante)
    this.editForm.setValue({
      representante: proveedor.representante,
      razon_social: proveedor.razon_social,
      nit: proveedor.nit,
      telefono: proveedor.telefono,
      direccion: proveedor.direccion,
      ciudad: proveedor.ciudad,
    });
    this.idCarpeta = proveedor._id;
  }

  editProveedor(form: any) {
    // this.almacenService.editProveedor(form, this.idProveedor).subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log('HTTP Error', err);
    //   },
    //   () => {
    //     this.editForm.reset();
    //     this.alertOk(
    //       'success',
    //       'Exito',
    //       'Proveedor editado Correctamente',
    //       '2000'
    //     );
    //     this.cargarProveedores();
    //   }
    // );
  }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    // this.almacenService.editProveedor(fd, id).subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => console.log('HTTP Error', err),
    //   () => {
    //     this.cargarProveedores();
    //   }
    // );
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
    this.cargarCarpetas();
  }

  borrarCarpeta(id: string) {
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
        Swal.fire('¡Eliminado!', 'El Proyecto ha sido eliminado.', 'success');
        // this.almacenService.deleteProveedor(id).subscribe(
        //   (res) => console.log(res),
        //   (err) => console.log('HTTP Error', err),
        //   () => this.cargarProveedores()
        // );
      }
    });
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
