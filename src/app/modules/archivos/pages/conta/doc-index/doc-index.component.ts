import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContaService } from '../../../services/conta.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doc-index',
  templateUrl: './doc-index.component.html',
  styleUrls: ['./doc-index.component.css']
})
export class DocIndexComponent implements OnInit {
  totalCarpetasConta: any = 0;
  archivos: any = [];
  archivosTemp: any = [];
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
  tipo:string = '';
  URL = environment.api;
  reportForm: FormGroup;

  constructor(private fb: FormBuilder, private contaService: ContaService, private router: Router) {
    this.reportForm = this.fb.group({
      idPartida: [''],
      unidadDeMedida: [''],
      codigo: [''],
      nombre: [''],
      cantidad: [''],
      stock:[]
    });
  }

  get form() {
    return this.reportForm.controls;
  }

  ngOnInit(): void {
    this.cargarArchivos()
  }

  cargarArchivos() {
    this.cargando = true;
    this.contaService.getAllArchivos(this.limit, this.skip, this.area)
      .subscribe((data: any) => {
        this.totalCarpetasConta = data.serverResponse.length;
        this.archivos = data;
        this.archivosTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
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

  borrarArchivo(id: string) {
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


  buscar(termino: string) {
    if (termino.length === 0) {
      this.archivos = this.archivosTemp;
      return;
    }
    this.contaService.searchArchivo(termino).subscribe((resp) => {
      console.log('Resp:', resp);
      this.archivos = resp;
      this.archivosTemp = resp;
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
    this.cargarArchivos();
  }

  editarPreventivo(preventivo:any){
    console.log(preventivo);
    this.router.navigate(['archivos/conta/docs/preven/edit', preventivo._id])
  }

}
