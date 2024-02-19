import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-proveedor-index',
  templateUrl: './proveedor-index.component.html',
  styleUrls: ['./proveedor-index.component.css'],
})
export class ProveedorIndexComponent implements OnInit {
  user: any;
  data: any;
  date = new Date();
  totalProveedores: any = 0;
  proveedores: any = [];
  listAllProveedores: any = [];
  programas: any = [];
  proveedoresTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  showModal: boolean = true;
  proveedorForm: any;
  editForm: any;
  cargando: boolean = true;
  idProveedor: any;

  constructor(private almacenService: AlmacenService, private fb: FormBuilder) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.proveedorForm = this.fb.group({
      representante: ['', [Validators.required]],
      razon_social: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: [''],
      ciudad: [''],
      usuario: [''],
    });

    this.editForm = this.fb.group({
      representante: ['', [Validators.required]],
      razon_social: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: [''],
      ciudad: [''],
    });
  }

  ngOnInit(): void {
    this.cargarProveedores();
    this.listProveedores()
  }

  cargarProveedores() {
    this.cargando = true;
    this.almacenService
      .getAllProveedores(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalProveedores = data.totalDocs;
        this.proveedores = data;
        this.proveedoresTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }
  listProveedores() {
    this.cargando = true;
    this.almacenService.getProveedores().subscribe((data: any) => {
      this.listAllProveedores = data.serverResponse;
      console.log("list",data);
      console.log("proveedores", this.proveedores)
    });
  }
  public doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  };

  crearProveedor(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.almacenService.createProveedor(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.proveedorForm.reset();
        this.cargarProveedores();
      }
    );
  }

  resetForm() {
    this.proveedorForm.reset();
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
    this.idProveedor = proveedor._id;
  }

  editProveedor(form: any) {
    this.almacenService.editProveedor(form, this.idProveedor).subscribe(
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
          'Proveedor editado Correctamente',
          '2000'
        );
        this.cargarProveedores();
      }
    );
  }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    this.almacenService.editProveedor(fd, id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.cargarProveedores();
      }
    );
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.proveedores = this.proveedoresTemp;
      return;
    }
    this.almacenService.searchProveedor(termino).subscribe((resp) => {
      console.log('Resp:', resp);
      this.proveedores = resp;
      this.proveedoresTemp = resp;
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
    this.cargarProveedores();
  }

  borrarProveedor(id: string) {
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
        this.almacenService.deleteProveedor(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarProveedores()
        );
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
