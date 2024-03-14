import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AutorizacionService } from '../../../services/autorizacion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-autorizacion-update',
  templateUrl: './autorizacion-update.component.html',
  styleUrls: ['./autorizacion-update.component.css']
})
export class AutorizacionUpdateComponent {
  idUser: any;
  user: any;
  data: any;
  editForm: any;
  files: any;
  progress: number = 0;
  area: boolean = true;
  unidades: any;
  vehiculos: any;
  conductores: any;
  cant: boolean = false;
  idAutorizacion: any;
  tipos: string[] = [];
  dataAutorizacion: any;

  constructor(private fb: FormBuilder, private autorizacionService: AutorizacionService, private router: Router, private activeRouter: ActivatedRoute) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.idAutorizacion = this.activeRouter.snapshot.paramMap.get('id');

    this.editForm = this.fb.group({
      conductor: [''],
      destino: ['', [Validators.required]],
      encargadoControl: [this.idUser, [Validators.required]],
      fecha: [''],
      fechaLlegada: [''],
      fechaSalida: [''],
      horaLlegada: [''],
      horaSalida: [''],
      motivo: ['', [Validators.required]],
      unidadSolicitante: [''],
      vehiculo: [0],
    });

    this.autorizacionService.getSingleAutorizacion(this.idAutorizacion)
    .subscribe((data: any) => {
      this.dataAutorizacion = data;
      console.log('autorizacion', data);

      this.editForm.patchValue({
        conductor: this.dataAutorizacion.conductor,
        destino: this.dataAutorizacion.destino,
        fecha: this.dataAutorizacion.fecha.substr(0, 10),
        fechaLlegada: this.dataAutorizacion.fechaLlegada.substr(0, 10),
        fechaSalida: this.dataAutorizacion.fechaSalida.substr(0, 10),
        horaLlegada: this.dataAutorizacion.horaLlegada,
        horaSalida: this.dataAutorizacion.horaSalida,
        motivo: this.dataAutorizacion.motivo,
        unidadSolicitante: this.dataAutorizacion.unidadSolicitante,
        vehiculo: this.dataAutorizacion.vehiculo,
      });
    });
  }

  ngOnInit(): void {

    this.cargarUnidadSolicitante();
    this.cargarConductor();
    this.cargarVehiculo();
  }

  cargarUnidadSolicitante() {
    this.autorizacionService.getAllUnidadSolicitante()
      .subscribe((data: any) => {
        this.unidades = data;
        // console.log('uniSolicitante', this.unidades);
      });
  }

  cargarConductor() {
    this.autorizacionService.getAllConductores()
      .subscribe((data: any) => {
        this.conductores = data.serverResponse;
        // console.log('conductores', this.conductores);
      });
  }

  cargarVehiculo() {
    this.autorizacionService.getAllVehiculos()
      .subscribe((data: any) => {
        this.vehiculos
          = data.serverResponse;
        // console.log('vehiculos', this.vehiculos);
      });
  }

  editarAutorizacion() {
    this.autorizacionService.editAutorizacion(this.editForm.value, this.idAutorizacion).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => {
        this.router.navigate(['actFijos/autorizacion/index']),
        this.alertOk('success', 'Exito', 'Autorizacion Editada Correctamente', '2000')
      }
    );
  }

  get form() {
    return this.editForm.controls;
  }


  actualizarSegundoSelect() {
    console.log("cambio");

    switch (this.editForm.value.area) {
      case 'administracion':
        this.tipos = ['Opción A', 'Opción B', 'Opción C'];
        break;
      case 'contabilidad':
        this.tipos = ['Preventivos', 'Devengados', 'Estados Financieros', 'Ingresos', 'Otros'];
        break;
      case 'recaudaciones':
        this.tipos = ['Opción 1', 'Opción 2', 'Opción 3'];
        break;
      case 'legal':
        this.tipos = ['Opción 4', 'Opción 5', 'Opción 6'];

        break;
      default:
        this.tipos = [];
        break;
    }
  }

  crearAutorizacion(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));

    console.log(form);

    this.autorizacionService.registrarAutorizacion(form).subscribe(
      (res) => {
        console.log(res);

      },

      (err) => console.log('HTTP Error', err),
      () => {
        this.router.navigate(['actFijos/autorizacion/index'])
        this.editForm.reset();

        this.alertOk(
          'success',
          'Exito',
          'Autorizacion Creada Correctamente',
          '2000'
        );

      }
    );
  }

  public doSelect = (value: any) => {
    // console.log('SingleDemoComponent.doSelect', value);
    // let search = this.areas.find((x: { nombre: any; }) => x.nombre == value);
    // this.tipos = search.tipos;
    // console.log(this.tipos);

    // this.user = this.users.find((item: { post: string; }) => item.post === value);
    // console.log(this.user)
  };

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }

  cancel() {
    this.router.navigate(['actFijos/autorizacion/index'])
  }


}
