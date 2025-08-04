import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DesembolsoService } from '../../services/desembolso.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConvenioService } from 'src/app/modules/convenio/services/convenio.service';

@Component({
  selector: 'app-gasto-fondo',
  // standalone: true,
  // imports: [],
  templateUrl: './gastoFondo.component.html',
  styleUrl: './gastoFondo.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GastoFondoComponent {
  idUser: any;
  user: any;
  data: any;
  totalData: number = 0;
  cargando: boolean = true;
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  gastoFondoForm: any = [];
  gastoFondos: any = [];
  partidas: any = [];

  editForm: any;
  idGastoFondo: any;

  constructor(
    private desembolsoService: DesembolsoService,
    private partida: ConvenioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.gastoFondoForm = this.fb.group({
      denominacion: ['', [Validators.required]],
      idPartida: ['', [Validators.required]],
    });

    this.editForm = this.fb.group({
      denominacion: ['', [Validators.required]],
      idPartida: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarGastosFondos();
    this.getPartidas();
  }
  cargarGastosFondos() {
    this.cargando = true;
    this.desembolsoService.getGastosFondos().subscribe((data: any) => {
      this.gastoFondos = data;
      this.totalData = data.length;
      console.log(data);

      this.cargando = false;
    });
  }
  borraGastoFondo(id: string) {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      text: 'Esta accion no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.desembolsoService.deleteGastoFondo(id).subscribe((data: any) => {
          Swal.fire(
            'Eliminado!',
            'El gasto de fondo ha sido eliminado.',
            'success'
          );
          this.cargarGastosFondos();
        });
      }
    });
  }
  editarGastoFondo(form: any) {
    this.desembolsoService.editGastoFondo(form, this.idGastoFondo).subscribe(
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
          'Gasto de Fondo editado Correctamente',
          '2000'
        );
        this.cargarGastosFondos();
      }
    );
  }
  addGastoFondo(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.desembolsoService.addGastoFondo(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.gastoFondoForm.reset();
        this.cargarGastosFondos();
        this.alertOk(
          'success',
          'Exito',
          'Gasto de Fondo Creada Correctamente',
          '2000'
        );
      }
    );
  }

  get form2() {
    return this.gastoFondoForm.controls;
  }
  get form() {
    return this.editForm.controls;
  }
  resetForm() {
    this.gastoFondoForm.reset();
  }
  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }

  cargarDataEdit(gastoFondo: any) {
    this.editForm.setValue({
      denominacion: gastoFondo.denominacion,
      idPartida: gastoFondo.idPartida?._id?? '',
    });
    this.idGastoFondo = gastoFondo._id;
  }
  getPartidas() {
    this.partida.getAllPartidas().subscribe(data => {
      this.partidas = data;
      // console.log("partidas", this.partidas)
      // console.log("partidas", data)
    })
  }
}
