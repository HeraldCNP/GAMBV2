import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaService } from 'src/app/modules/archivos/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preven-create',
  templateUrl: './preven-create.component.html',
  styleUrls: ['./preven-create.component.css']
})
export class PrevenCreateComponent implements OnInit {
  idUser: any;
  user: any;
  data: any;
  prevenForm:any;
  files: any;
  progress: number = 0;
  carpetaId?:any;



  constructor(private fb: FormBuilder, private router: Router, private contaService: ContaService, private activeRouter: ActivatedRoute) {
    this.prevenForm = this.fb.group({
      numero: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      glosa: ['', [Validators.required]],
      beneficiario: ['', [Validators.required]],
      ci: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      fojas: ['', [Validators.required]],
      archivo: [''],
      observacion: ['']
    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;

    this.carpetaId = this.activeRouter.snapshot.paramMap.get('id');
  }



  get form() {
    return this.prevenForm.controls;
  }



  crearPreven() {
    let fd = new FormData();

    if (!this.prevenForm.value.archivo) {
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

      fd.append('numero', this.prevenForm.value.numero);
      fd.append('fecha', this.prevenForm.value.fecha);
      fd.append('glosa', this.prevenForm.value.glosa);
      fd.append('beneficiario', this.prevenForm.value.beneficiario);
      fd.append('ci', this.prevenForm.value.ci);
      fd.append('monto', this.prevenForm.value.monto);
      fd.append('fojas', this.prevenForm.value.fojas);
      fd.append('observacion', this.prevenForm.value.observacion);
      fd.append('usuario', this.idUser);

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


      fd.append('numero', this.prevenForm.value.numero);
      fd.append('fecha', this.prevenForm.value.fecha);
      fd.append('glosa', this.prevenForm.value.glosa);
      fd.append('beneficiario', this.prevenForm.value.beneficiario);
      fd.append('ci', this.prevenForm.value.ci);
      fd.append('monto', this.prevenForm.value.monto);
      fd.append('fojas', this.prevenForm.value.fojas);
      fd.append('observacion', this.prevenForm.value.observacion);
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
