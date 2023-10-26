import { Component, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlantillaService } from '../../../services/plantilla.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-doc-normativa',
  templateUrl: './doc-normativa.component.html',
  styleUrls: ['./doc-normativa.component.css']
})
export class DocNormativaComponent {
  docNormativas: any = [];
  tipos: any = [];
  auditoria: any;
  idDocNormativa: any;
  date = new Date();
  URL = environment.api;
  status: any;
  showModal: boolean = false;
  addForm: any;
  editForm: any;
  files: any = [];
  progress: number = 0;
  docNormativaId: any;

  private plantillaService = inject(PlantillaService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.addForm = this.fb.group({
      titulo: ['', [Validators.required]],
      fecha: [''],
      fechaFin: [''],
      archivo: [''],
      tipo_normativa: ['', [Validators.required]],
      // idUsuario: ['']
    });

    this.editForm = this.fb.group({
      titulo: ['', [Validators.required]],
      fecha: [''],
      fechaFin: [''],
      archivo: [''],
      tipo_normativa: ['', [Validators.required]],
      // idUsuario: ['']
    });
  }

  ngOnInit(): void {
    this.getDocNormativas();
    this.getTipos();
  }

  getDocNormativas() {
    this.plantillaService.getAllDocNormativas().subscribe
      (res => {
        this.docNormativas = res;
        console.log('docs', this.docNormativas)
      });
  }

  getTipos() {
    this.plantillaService.getAllTipos().subscribe
      (res => {
        this.tipos = res;
        console.log('modelos', this.tipos)
      });
  }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado)
    this.plantillaService.changeEstadoDocNormativa(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getDocNormativas();
        }
      );
  }

  changeStatus2(id: any, vigente: any) {
    let fd = new FormData();
    fd.append('vigente', vigente);
    console.log(vigente)
    this.plantillaService.changeEstadoDocNormativa(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getDocNormativas();
        }
      );
  }


  deleteDocumento(id: string) {
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
        this.plantillaService.deleteDocNormativa(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getDocNormativas()
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
    this.docNormativaId = id;
  }

  addArchivo() {
    let fd = new FormData();
    fd.append('titulo', this.addForm.value.titulo);
    fd.append('fecha', this.addForm.value.fecha);
    fd.append('fechaFin', this.addForm.value.fechaFin);
    fd.append('tipo_normativa', this.addForm.value.tipo_normativa);
    fd.append('file', this.files[0]);
    this.plantillaService.registerDocNormativa(fd).subscribe(
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
        this.getDocNormativas();
        this.resetForm();
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

  cargarDataEdit(documento: any) {
    // console.log("Rendi Edit", pei)
    if(documento.fechaFin){
      this.editForm.setValue({
        titulo: documento.titulo,
        fecha: documento.fecha.substr(0, 10),
        fechaFin: documento.fechaFin.substr(0, 10),
        archivo: null,
        tipo_normativa: documento.tipo_normativa._id,
      });
    }else{
      this.editForm.setValue({
        titulo: documento.titulo,
        fecha: documento.fecha.substr(0, 10),
        fechaFin: '',
        archivo: null,
        tipo_normativa: documento.tipo_normativa._id,
      });
    }

    this.idDocNormativa = documento._id;
  }


  editDocumento() {
    let fd = new FormData();

    if (this.files[0]) {
      fd.append('tipo_normativa', this.editForm.value.tipo_normativa);
      fd.append('titulo', this.editForm.value.titulo);
      fd.append('fecha', this.editForm.value.fecha);
      fd.append('fechaFin', this.editForm.value.fechaFin);
      fd.append('file', this.files[0]);
    } else {
      fd.append('tipo_normativa', this.editForm.value.tipo_normativa);
      fd.append('titulo', this.editForm.value.titulo);
      fd.append('fecha', this.editForm.value.fecha);
      fd.append('fechaFin', this.editForm.value.fechaFin);
    }

    // let fd = new FormData();

    console.log(this.idDocNormativa)

    this.plantillaService.editarDocNormativa(fd, this.idDocNormativa).subscribe(
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
        this.getDocNormativas();
      }
    );
  }
}
