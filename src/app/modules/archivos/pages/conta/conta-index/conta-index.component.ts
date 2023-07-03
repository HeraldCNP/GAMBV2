import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContaService } from '../../../services/conta.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conta-index',
  templateUrl: './conta-index.component.html',
  styleUrls: ['./conta-index.component.css']
})
export class ContaIndexComponent implements OnInit {
  totalCarpetasConta: any = 0;
  carpetas: any = [];
  carpetasTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  contaForm: any;
  editForm: any;
  cargando: boolean = true;
  idCarpeta: any;
  idCarpetaConta: any;
  area:string = 'contabilidad';
  carpeta:any;
  tipos:string = '';
  tipo:string = 'Preventivos';
  estadoFinan: any ;

  constructor(private fb: FormBuilder, private contaService: ContaService, private router: Router) {
    this.contaForm = this.fb.group({
      numero: [''],
      detalle: ['', [Validators.required]],
      beneficiario: [''],
      fecha: [''],
      monto: [''],
      fojas: ['', [Validators.required]],
      observacion: [''],
      idCarpeta: [''],
    });

    this.estadoFinan = this.fb.group({

    })


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
    this.cargarCarpetasConta()
  }

  cargarCarpetasConta() {
    this.cargando = true;
    this.contaService.getAllConta(this.limit, this.skip, this.area, this.tipo)
      .subscribe((data: any) => {
        this.totalCarpetasConta = data.serverResponse.length;
        this.carpetas = data;
        this.carpetasTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  get form() {
    return this.contaForm.controls;
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
    this.cargarCarpetasConta();
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

  crearConta(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.contaService.createConta(form, this.idCarpetaConta).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.contaForm.reset();
        this.alertOk(
          'success',
          'Exito',
          'Documento Registrado Correctamente',
          '2000'
        );
        this.cargarCarpetasConta();
      }
    );
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }

  resetForm() {
    this.contaForm.reset();
  }

  addCarpetaId(carpeta:any){
    console.log(carpeta);
    this.tipos = carpeta.tipo;
    this.contaForm.setValue({
      numero: '',
      detalle: '',
      beneficiario: '',
      fecha: '',
      monto: '',
      fojas: '',
      observacion: '',
      idCarpeta: carpeta._id,
    });
    this.idCarpetaConta = carpeta._id;
  }

  verDocumentos(carpeta:any){
    this.contaService.getSingleCarpeta(carpeta._id).subscribe(
      (res) => {
        this.carpeta = res.serverResponse;
        console.log(this.carpeta);
      },
      (err) => console.log('HTTP Error', err),
      () => {

      }
    );
  }

  changeStatus(status: any) {
    this.tipo = status;
    this.cargarCarpetasConta();
    this.skip = 1;
  }

}
