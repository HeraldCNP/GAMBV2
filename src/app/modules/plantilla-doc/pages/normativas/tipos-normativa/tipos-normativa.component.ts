import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PlantillaService } from '../../../services/plantilla.service';

@Component({
  selector: 'app-tipos-normativa',
  templateUrl: './tipos-normativa.component.html',
  styleUrls: ['./tipos-normativa.component.css']
})
export class TiposNormativaComponent {
  totalTipos: any = 0;
  tipos: any = [];
  tiposTemp: any = [];

  programas: any = [];

  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  tipoForm: any;
  editForm: any;
  cargando: boolean = true;

  tipoDelForm: any;
  idModelo: any;
  area: any;
  area2: any;

  private fb = inject(FormBuilder);
  private plantillaService = inject(PlantillaService);

  constructor() {
    this.tipoForm = this.fb.group({
      tipo: ['', [Validators.required]],
    });

    this.editForm = this.fb.group({
      tipo: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.cargarTipos()
  }

  cargarTipos() {
    this.cargando = true;
    this.plantillaService.getAllTipos()
      .subscribe((data: any) => {
        this.totalTipos = data.totalDocs;
        this.tipos = data;
        this.tiposTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  cargarDataEdit(tipo: any) {
    // console.log("Rendi Edit", pei)
    this.editForm.setValue({
      tipo: tipo.tipo,
    });
    this.idModelo = tipo._id;
  }

  crearTipo(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.plantillaService.createTipo(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.tipoForm.reset();
        this.cargarTipos();
      }
    );
  }

  editTipo(form: any) {
    this.plantillaService.editarTipo(form, this.idModelo).subscribe(
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
          'Tipo Editado Correctamente',
          '2000'
        );
        this.cargarTipos();
      }
    );
  }

  borrarTipo(id: string) {
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
        Swal.fire('¡Eliminado!', 'El Modelo ha sido eliminado.', 'success');
        this.plantillaService.deleteTipo(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarTipos()
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

  // buscar(termino: string) {
  //   if (termino.length === 0) {
  //     this.modelos = this.modelosTemp;
  //     return;
  //   }
  //   this.PlantillaService.searchProveedor(termino).subscribe((resp) => {
  //     console.log('Resp:', resp);
  //     this.areas = resp;
  //     this.areasTemp = resp;
  //   });
  // }

  cambiarPagina(valor: number) {
    this.skip += valor;
    this.page += valor;
    if (this.page < 0) {
      this.skip = 0;
    } else if (this.page > this.totalPages) {
      this.skip -= valor;
      this.page -= valor;
    }
    this.cargarTipos();
  }

  resetForm() {
    this.tipoForm.reset();
  }
}
