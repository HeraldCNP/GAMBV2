import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlmacenService } from 'src/app/modules/almacen/services/almacen.service';
import Swal from 'sweetalert2';
import { AreaService } from '../../../services/area.service';

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
  tipoForm: any;
  editForm: any;
  tipoDelForm: any;
  cargando: boolean = true;
  idArea: any;
  area: any;
  area2: any;

  constructor(private fb: FormBuilder, private areaService: AreaService) {
    this.areaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      usuario: [''],
    });

    this.editForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });

    this.tipoForm = this.fb.group({
      tipos: ['', [Validators.required]],
      usuario: [''],
    });

    this.tipoDelForm = this.fb.group({
      tipos: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarAreas()
  }

  cargarAreas() {
    this.cargando = true;
    this.areaService
      .getAllAreas(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalAreas = data.totalDocs;
        this.areas = data;
        this.areasTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  cargarArea(area: any) {
    this.area = area.tipos;
    console.log(this.area);
    this.area2 = area;
  }

  public doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  };

  crearArea(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.areaService.createArea(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.areaForm.reset();
        this.cargarAreas();
      }
    );
  }

  resetForm() {
    this.areaForm.reset();
  }

  cargarDataEdit(area: any) {
    // console.log("idProve", proveedor.representante)
    this.editForm.setValue({
      nombre: area.nombre,
    });
    this.idArea = area._id;
  }

  cargarDataTipo(area: any) {
    // console.log("idProve", proveedor.representante)
    // this.tipoForm.setValue({
    //   tipo: area.tipo,
    // });
    this.idArea = area._id;
  }

  crearTipo(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.areaService.createTipo(form, this.idArea).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.tipoForm.reset();
        this.cargarAreas();
      }
    );
  }

  editArea(form: any) {
    this.areaService.editArea(form, this.idArea).subscribe(
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
        this.cargarAreas();
      }
    );
  }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    this.areaService.editArea(fd, id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.cargarAreas();
      }
    );
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.areas = this.areasTemp;
      return;
    }
    this.areaService.searchProveedor(termino).subscribe((resp) => {
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
    this.cargarAreas();
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
        Swal.fire('¡Eliminado!', 'El Area ha sido eliminado.', 'success');
        this.areaService.deleteArea(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarAreas()
        );
      }
    });
  }

  borrarTipo(tipo: string) {

    let tipos = {tipos:tipo}

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
        Swal.fire('¡Eliminado!', 'El Tipo ha sido eliminado.', 'success');
        this.areaService.deleteTipo(tipos, this.area2._id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarAreas()
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
