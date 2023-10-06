import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from 'ngx-editor';
import Swal from 'sweetalert2';
import { PlantillaService } from '../../../services/plantilla.service';

@Component({
  selector: 'app-model-index',
  templateUrl: './model-index.component.html',
  styleUrls: ['./model-index.component.css']
})
export class ModelIndexComponent implements OnInit {
  totalModelos: any = 0;
  modelos: any = [];
  programas: any = [];
  modelosTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  modeloForm: any;
  editForm: any;
  cargando: boolean = true;

  tipoForm: any;
  tipoDelForm: any;
  idModelo: any;
  area: any;
  area2: any;

  private fb = inject(FormBuilder);
  private plantillaService = inject(PlantillaService);

  constructor() {
    this.modeloForm = this.fb.group({
      tipo: ['', [Validators.required]],
    });

    this.editForm = this.fb.group({
      tipo: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.cargarModelos()
  }

  cargarModelos() {
    this.cargando = true;
    this.plantillaService.getAllModelos()
      .subscribe((data: any) => {
        this.totalModelos = data.totalDocs;
        this.modelos = data;
        this.modelosTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  cargarDataEdit(modelo: any) {
    // console.log("Rendi Edit", pei)
    this.editForm.setValue({
      tipo: modelo.tipo,
    });
    this.idModelo = modelo._id;
  }

  crearModelo(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.plantillaService.createModelo(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.modeloForm.reset();
        this.cargarModelos();
      }
    );
  }

  editModelo(form: any) {
    this.plantillaService.editarModelo(form, this.idModelo).subscribe(
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
          'Modelo Editado Correctamente',
          '2000'
        );
        this.cargarModelos();
      }
    );
  }

  borrarModelo(id: string) {
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
        this.plantillaService.deleteModelo(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarModelos()
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

  buscar(termino: string) {
    if (termino.length === 0) {
      this.modelos = this.modelosTemp;
      return;
    }
    // this.PlantillaService.searchProveedor(termino).subscribe((resp) => {
    //   console.log('Resp:', resp);
    //   this.areas = resp;
    //   this.areasTemp = resp;
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
    this.cargarModelos();
  }

  resetForm() {
    this.modeloForm.reset();
  }

}
