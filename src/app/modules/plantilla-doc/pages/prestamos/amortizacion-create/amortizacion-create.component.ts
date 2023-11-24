import { HttpEventType } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PrestamosService } from '../../../services/prestamos.service';

@Component({
  selector: 'app-amortizacion-create',
  templateUrl: './amortizacion-create.component.html',
  styleUrls: ['./amortizacion-create.component.css']
})
export class AmortizacionCreateComponent {
  idUser: any;
  user: any;
  data: any;
  amortiForm: any;
  idPrestamo:any;

  files: any;
  progress: number = 0;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private prestamoService = inject(PrestamosService);
  private activeRouter= inject (ActivatedRoute);


  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.idPrestamo = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.idPrestamo);

    this.amortiForm = new FormGroup({
      periodo: new FormControl('', [Validators.required, Validators.minLength(4)]),
      monto: new FormControl(''),
      interes: new FormControl(''),
      fechaPago: new FormControl(''),
      fuente: new FormControl(''),
      archivo: new FormControl('', Validators.required),
      usuario: new FormControl(this.idUser, Validators.required),
    });
  }

  titulos = {
    list: [
      {
        name: 'POA Inicial',
      },
      {
        name: 'POA Corregido',
      },
    ],
  };

  get form() {
    return this.amortiForm.controls;
  }

  crearAmorti() {
    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();
    fd.append('periodo', this.amortiForm.value.periodo);
    fd.append('monto', this.amortiForm.value.monto);
    fd.append('interes', this.amortiForm.value.interes);
    fd.append('fechaPago', this.amortiForm.value.fechaPago);
    fd.append('fuente', this.amortiForm.value.fuente);
    fd.append('usuario', this.idUser);
    fd.append('file', this.files[0]);

    this.prestamoService.addAmortizacion(fd, this.idPrestamo).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }
      },
      (err) => {
        console.log('HTTP Error', err);
        this.progress = 0;
      },
      () => {
        this.progress = 0;
        this.router.navigate(['doc/prestamos/index']);
        this.alertOk(
          'success',
          'Exito',
          'Amortización Creado Correctamente',
          '2000'
        );
      }
    );
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }

  cancel() {
    this.router.navigate(['doc/prestamos/index']);
  }

}
