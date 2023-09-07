import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AlmacenService } from '../../../services/almacen.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catProgra } from '../../../interfaces/catProgra.interface';

@Component({
  selector: 'app-cat-progra-index',
  templateUrl: './cat-progra-index.component.html',
  styleUrls: ['./cat-progra-index.component.css']
})
export class CatPrograIndexComponent implements OnInit {
  totalCatProgras: any = 0;
  catProgras: catProgra[] = [];
  programas: any = [];
  catPrograsTemp: catProgra[] = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  showModal: boolean = true;
  catPrograForm: FormGroup;
  editForm: any;
  cargando: boolean = true;
  idProveedor: any;
  areas: any;
  funcionarios:any;

  constructor(private almacenService: AlmacenService, private fb: FormBuilder) {
    this.catPrograForm = this.fb.group({
      area: [''],
      responsable: [''],
      cat_programatica: ['', [Validators.required]],
      proyect_acti: [''],
      presupuesto_vigente: [''],
      etapa: ['', [Validators.required]],
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
    this.cargarCatProgras();
    this.cargarAreas();
    this.cargarFuncionarios()
  }

  cargarCatProgras() {
    this.cargando = true;
    this.almacenService
      .getAllCatProgras(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalCatProgras = data.totalDocs;
        this.catProgras = data.serverResponse;
        this.catPrograsTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  cargarAreas() {
    this.cargando = true;
    this.almacenService.getAllAreas().subscribe((data: any) => {
      this.areas = data;
      console.log("Areas", data)
    });
  }

  cargarFuncionarios() {
    this.cargando = true;
    this.almacenService.getAllFuncionarios().subscribe((data: any) => {
      this.funcionarios = data.serverResponse;
      console.log("Funcionarios", this.funcionarios)
    });
  }

  public doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  };

  crearCatProgra(form: catProgra) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.almacenService.createCatProgra(form).subscribe(
      (res) => {
        console.log(res);
        this.alertOk(
          'success',
          'Exito',
          'Categoria Programatica Creada Correctamente',
          '2000'
        );
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.catPrograForm.reset();
        this.cargarCatProgras();
      }
    );
  }

  resetForm() {
    this.catPrograForm.reset();
  }

  get form() {
    return this.catPrograForm.controls;
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
        this.cargarCatProgras();
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
        this.cargarCatProgras();
      }
    );
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.catProgras = this.catPrograsTemp;
      return;
    }
    this.almacenService.searchProveedor(termino).subscribe((resp) => {
      console.log('Resp:', resp);
      this.catProgras = resp;
      this.catPrograsTemp = resp;
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
    this.cargarCatProgras();
  }

  borrarCatProgra(id: string) {
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
          () => this.cargarCatProgras()
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
