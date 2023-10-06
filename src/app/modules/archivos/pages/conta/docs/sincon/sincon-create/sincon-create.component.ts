import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaService } from 'src/app/modules/archivos/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sincon-create',
  templateUrl: './sincon-create.component.html',
  styleUrls: ['./sincon-create.component.css']
})
export class SinconCreateComponent {
  idUser: any;
  user: any;
  data: any;
  sinconForm: any;
  files: any;
  progress: number = 0;
  carpetaId?: any;
  carpetas?: any;
  area: any = 'contabilidad';
  tipo: any = 'Gastos';
  subTipo: any = 'cip';




  constructor(private fb: FormBuilder, private router: Router, private contaService: ContaService, private activeRouter: ActivatedRoute) {
    this.sinconForm = this.fb.group({
      numero: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      glosa: ['', [Validators.required]],
      beneficiario: ['', [Validators.required]],
      ci: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      fojas: ['', [Validators.required]],
      archivo: [''],
      observacion: [''],
      carpetas: ['']
    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;

    this.carpetaId = this.activeRouter.snapshot.paramMap.get('id');

    this.cargarCarpetasConta();
  }

  cargarCarpetasConta() {
    this.contaService.getAllCarpetasConta(this.area, this.tipo, this.subTipo)
      .subscribe((data: any) => {
        this.carpetas = data.serverResponse;
        console.log(this.carpetas);
      });
  }


  get form() {
    return this.sinconForm.controls;
  }





  crearSincon() {
    let fd = new FormData();

    if (!this.sinconForm.value.archivo) {
      // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
      // numero: [''],
      // fecha: [''],
      // glosa: ['', [Validators.required]],
      // beneficiario: [''],
      // ci: [''],
      // monto: [''],
      // fojas: ['', [Validators.required]],
      // archivo: [''],
      // observacion: [''],
      // idCarpeta: [''],
      fd.append('numero', this.sinconForm.value.numero);
      fd.append('fecha', this.sinconForm.value.fecha);
      fd.append('glosa', this.sinconForm.value.glosa);
      fd.append('beneficiario', this.sinconForm.value.beneficiario);
      fd.append('ci', this.sinconForm.value.ci);
      fd.append('monto', this.sinconForm.value.monto);
      fd.append('fojas', this.sinconForm.value.fojas);
      fd.append('observacion', this.sinconForm.value.observacion);
      fd.append('carpetas', this.sinconForm.value.carpetas);
      fd.append('usuario', this.idUser);
      console.log(fd.get('carpetas'));

      this.contaService.registerPreven(fd, this.carpetaId).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log('HTTP Error', err);
        },
        () => {
          this.router.navigate(['archivos/conta/index']);
          this.alertOk(
            'success',
            'Exito',
            'Documento Creado Correctamente',
            '2000'
          );
        }
      );
    } else {
      // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
      fd.append('numero', this.sinconForm.value.numero);
      fd.append('fecha', this.sinconForm.value.fecha);
      fd.append('glosa', this.sinconForm.value.glosa);
      fd.append('beneficiario', this.sinconForm.value.beneficiario);
      fd.append('ci', this.sinconForm.value.ci);
      fd.append('monto', this.sinconForm.value.monto);
      fd.append('fojas', this.sinconForm.value.fojas);
      fd.append('observacion', this.sinconForm.value.observacion);
      fd.append('carpetas', this.sinconForm.value.carpetas);
      fd.append('usuario', this.idUser);
      fd.append('file', this.files[0]);

      this.contaService.registerPreven(fd, this.carpetaId).subscribe(
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
          this.router.navigate(['archivos/conta/index']);
          this.alertOk(
            'success',
            'Exito',
            'Documento Creado Correctamente',
            '2000'
          );
        }
      );
    }
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
    this.router.navigate(['archivos/conta/index']);
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }
}
