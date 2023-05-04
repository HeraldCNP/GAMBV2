import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GacetaService } from '../../../services/gaceta.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-auditoria-index',
  templateUrl: './auditoria-index.component.html',
  styleUrls: ['./auditoria-index.component.css']
})
export class AuditoriaIndexComponent implements OnInit {

  auditorias: any = [];
  auditoria: any;
  idAuditoria: any;
  date = new Date();
  URL = environment.api;
  status: any;
  showModal: boolean = false;
  addForm: any;
  editForm: any;
  files: any = [];
  progress: number = 0;
  auditoriaId: any;

  tipos = {
    "list": [
      {
        "name": "Resúmen Ejecutivo Auditorias de Confiabilidad"
      },
      {
        "name": "Resúmen Ejecutivo Auditoria Operativa IDH"
      },
      {
        "name": "Resúmen Ejecutivo Programa Operativo Anual"
      },
    ]
  }

  constructor(private router: Router, private api: GacetaService, private fb: FormBuilder) {
    this.addForm = new FormGroup({
      gestion: new FormControl('2023', Validators.required),
      tipo: new FormControl('', Validators.required),
      resumen: new FormControl('', Validators.required),
      fecha: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      archivo: new FormControl('', Validators.required),
    });

    this.editForm = this.fb.group({
      gestion: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      resumen: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      archivo: [''],
    });
  }

  ngOnInit(): void {
    this.getAuditorias()
  }

  getAuditorias() {
    this.api.getAllAuditorias().subscribe
      (res => {
        this.auditorias = res;
        console.log(this.auditorias)
      });
  }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado)
    this.api.changeEstadoAuditoria(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getAuditorias();
        }
      );
  }


  deleteAuditoria(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El Documento ha sido eliminado.',
          'success'
        )
        this.api.deleteAuditoria(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getAuditorias()
        );
      }
    })
  }

  get form() {
    return this.addForm.controls;
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  getId(id: string) {
    this.auditoriaId = id;
  }

  addArchivo(form: FormData) {
    let fd = new FormData();
    fd.append('resumen', this.addForm.value.resumen);
    fd.append('fecha', this.addForm.value.fecha);
    fd.append('gestion', this.addForm.value.gestion);
    fd.append('tipo', this.addForm.value.tipo);
    fd.append('file', this.files[0]);
    this.api.registerAuditoria(fd).subscribe(
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
        this.getAuditorias();
        this.resetForm();
        // this.router.navigate(['docAdmin/reglamento/index']);
        this.alertOk(
          'success',
          'Exito',
          'Documento Creado Correctamente',
          '2000'
        );
      }

    );
  }

  resetForm() {
    this.addForm.reset();
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }

  cargarDataEdit(auditoria: any) {
    // console.log("Rendi Edit", pei)
    this.editForm.setValue({
      resumen: auditoria.resumen,
      tipo: auditoria.tipo,
      gestion: auditoria.gestion,
      fecha: auditoria.fecha.substr(0, 10),
      archivo: null
    });
    this.idAuditoria = auditoria._id;
  }

  editAuditoria() {
    let fd = new FormData();

    if (this.files[0]) {
      fd.append('resumen', this.editForm.value.resumen);
      fd.append('fecha', this.editForm.value.fecha);
      fd.append('gestion', this.editForm.value.gestion);
      fd.append('tipo', this.editForm.value.tipo);
      fd.append('file', this.files[0]);
    } else {
      fd.append('resumen', this.editForm.value.resumen);
      fd.append('fecha', this.editForm.value.fecha);
      fd.append('gestion', this.editForm.value.gestion);
      fd.append('tipo', this.editForm.value.tipo);
    }

    // let fd = new FormData();

    console.log(this.idAuditoria)

    this.api.editarAuditoria(fd, this.idAuditoria).subscribe(
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
          'Documento editado Correctamente',
          '2000'
        );
        this.getAuditorias();
      }
    );
  }

}
