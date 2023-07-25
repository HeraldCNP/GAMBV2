import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { ContaService } from 'src/app/modules/archivos/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preven-edit',
  templateUrl: './preven-edit.component.html',
  styleUrls: ['./preven-edit.component.css']
})
export class PrevenEditComponent implements OnInit {
  archivoId:any;
  idUser: any;
  user: any;
  data: any;
  dataArchivo:any;
  files: any;
  progress: number = 0;

  editForm = this.fb.group({
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

  constructor(private activeRouter: ActivatedRoute, private fb: FormBuilder, private contaService: ContaService, private router: Router) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.archivoId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.archivoId);

    this.contaService.getSingleArchivo(this.archivoId).subscribe(data => {
      this.dataArchivo = data;
      console.log(data);
      // console.log(this.dataArchivo);
      // this.listadeArticulos = this.dataArchivo.productos;

      // console.log(this.dataArchivo.productos.length)

      this.editForm.setValue({
        numero: this.dataArchivo.numero,
        fecha: this.dataArchivo.fecha.substr(0, 10),
        glosa: this.dataArchivo.glosa,
        beneficiario: this.dataArchivo.beneficiario,
        ci: this.dataArchivo.ci,
        monto: this.dataArchivo.monto,
        fojas: this.dataArchivo.fojas,
        archivo: '',
        observacion: this.dataArchivo.observacion,
      });
    })
  }

  ngOnInit(): void {

  }

  get form() {
    return this.editForm.controls;
  }


  cancel() {
    this.router.navigate(['archivos/conta/index']);
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  editArchivo() {
    let fd = new FormData();

    if (!this.editForm.value.archivo) {

      console.log(this.editForm.value.numero);

      // fd.append('numero', this.editForm.value.numero);
      // fd.append('fecha', this.editForm.value.fecha);
      // fd.append('glosa', this.editForm.value.glosa);
      // fd.append('beneficiario', this.editForm.value.beneficiario);
      // fd.append('ci', this.editForm.value.ci);
      // fd.append('monto', this.editForm.value.monto);
      // fd.append('fojas', this.editForm.value.fojas);
      // fd.append('observacion', this.editForm.value.observacion);
      fd.append('usuario', this.idUser);

      // this.contaService.registerPreven(fd, this.archivoId).subscribe(
      //   (res) => {
      //     console.log(res);
      //   },
      //   (err) => {
      //     console.log('HTTP Error', err);
      //   },
      //   () => {
      //     this.router.navigate(['archivos/conta/index']);
      //     this.alertOk(
      //       'success',
      //       'Exito',
      //       'Documento Creado Correctamente',
      //       '2000'
      //     );
      //   }
      // );
    } else {
      // Creación del objeto donde incluimos todos los campos del formulario y además la imagen


      // fd.append('numero', this.editForm.value.numero);
      // fd.append('fecha', this.editForm.value.fecha);
      // fd.append('glosa', this.editForm.value.glosa);
      // fd.append('beneficiario', this.editForm.value.beneficiario);
      // fd.append('ci', this.editForm.value.ci);
      // fd.append('monto', this.editForm.value.monto);
      // fd.append('fojas', this.editForm.value.fojas);
      // fd.append('observacion', this.editForm.value.observacion);
      // fd.append('usuario', this.idUser);
      // fd.append('file', this.files[0]);

      // this.contaService.registerPreven(fd, this.archivoId).subscribe(
      //   (event) => {
      //     if (event.type === HttpEventType.UploadProgress) {
      //       this.progress = Math.round((100 * event.loaded) / event.total);
      //     }
      //   },
      //   (err) => {
      //     console.log('HTTP Error', err);
      //     this.progress = 0;
      //   },
      //   () => {
      //     this.progress = 0;
      //     this.router.navigate(['archivos/conta/index']);
      //     this.alertOk(
      //       'success',
      //       'Exito',
      //       'Documento Creado Correctamente',
      //       '2000'
      //     );
      //   }
      // );
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
}
