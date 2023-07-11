import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlmacenService } from 'src/app/modules/almacen/services/almacen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area-index',
  templateUrl: './area-index.component.html',
  styleUrls: ['./area-index.component.css']
})
export class AreaIndexComponent implements OnInit {
  totalAreas: any = 0;
  areas: any = [];
  programas: any = [];
  areasTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  areaForm: any;
  editForm: any;
  cargando: boolean = true;
  idArea: any;

  constructor(private fb: FormBuilder, private almacenService: AlmacenService) {
    this.areaForm = this.fb.group({
      representante: ['', [Validators.required]],
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
  }

  cargarProveedores() {
    this.cargando = true;
    this.almacenService
      .getAllProveedores(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalAreas = data.totalDocs;
        this.areas = data;
        this.areasTemp = data;
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
    this.almacenService.createProveedor(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.areaForm.reset();
        this.cargarProveedores();
      }
    );
  }

  resetForm() {
    this.areaForm.reset();
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
    this.idArea = proveedor._id;
  }

  editProveedor(form: any) {
    this.almacenService.editProveedor(form, this.idArea).subscribe(
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
      this.areas = this.areasTemp;
      return;
    }
    this.almacenService.searchProveedor(termino).subscribe((resp) => {
      console.log('Resp:', resp);
      this.areas = resp;
      this.areasTemp = resp;
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

  borrarArea(id: string) {
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
