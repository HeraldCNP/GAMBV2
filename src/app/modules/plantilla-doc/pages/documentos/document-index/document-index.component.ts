import { Component, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { PlantillaService } from '../../../services/plantilla.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-document-index',
  templateUrl: './document-index.component.html',
  styleUrls: ['./document-index.component.css']
})
export class DocumentIndexComponent {
  documentos: any = [];
  modelos: any = [];
  auditoria: any;
  idDocumento: any;
  date = new Date();
  URL = environment.api;
  status: any;
  showModal: boolean = false;
  addForm: any;
  editForm: any;
  files: any = [];
  progress: number = 0;
  documentoId: any;

  private plantillaService = inject(PlantillaService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.addForm = this.fb.group({
      titulo: [''],
      fecha: [''],
      archivo: [''],
      modelo_tipo: ['', [Validators.required]],
      // idUsuario: ['']
    });

    this.editForm = this.fb.group({
      titulo: [''],
      fecha: [''],
      archivo: [''],
      modelo_tipo: [''],
      // idUsuario: ['']
    });
  }

  ngOnInit(): void {
    this.getDocumentos();
    this.getModelos();
  }

  getDocumentos() {
    this.plantillaService.getAllDocumentos().subscribe
      (res => {
        this.documentos = res;
        console.log('docs', this.documentos)
      });
  }

  getModelos() {
    this.plantillaService.getAllModelos().subscribe
      (res => {
        this.modelos = res;
        console.log('modelos', this.modelos)
      });
  }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado)
    // this.plantillaService.changeEstadoAuditoria(id, fd)
    //   .subscribe(
    //     res => {
    //       console.log(res)
    //     },
    //     err => console.log('HTTP Error', err),
    //     () => {
    //       this.getAuditorias();
    //     }
    //   );
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
        this.plantillaService.deleteDocumento(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getDocumentos()
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
    this.documentoId = id;
  }

  addArchivo() {
    let fd = new FormData();
    fd.append('titulo', this.addForm.value.titulo);
    fd.append('fecha', this.addForm.value.fecha);
    fd.append('modelo_tipo', this.addForm.value.modelo_tipo);
    fd.append('file', this.files[0]);
    this.plantillaService.registerDocumento(fd).subscribe(
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
        this.getDocumentos();
        this.resetForm();

        this.alertOk(
          'success',
          'Exito',
          'Documento Creado Correctamente',
          '2000'
        );

      }
    );
    this.router.navigate(['doc/documentos/index']);
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
    this.editForm.setValue({
      modelo_tipo: documento.modelo_tipo._id,
      titulo: documento.titulo,
      fecha: documento.fecha.substr(0, 10),
      archivo: null,
    });
    this.idDocumento = documento._id;
  }

  editDocumento() {
    let fd = new FormData();

    if (this.files[0]) {
      fd.append('modelo_tipo', this.editForm.value.modelo_tipo);
      fd.append('titulo', this.editForm.value.titulo);
      fd.append('fecha', this.editForm.value.fecha);
      fd.append('file', this.files[0]);
    } else {
      fd.append('modelo_tipo', this.editForm.value.modelo_tipo);
      fd.append('titulo', this.editForm.value.titulo);
      fd.append('fecha', this.editForm.value.fecha);
    }

    // let fd = new FormData();

    console.log(this.idDocumento)

    this.plantillaService.editarDocumento(fd, this.idDocumento).subscribe(
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
        this.getDocumentos();
      }
    );
  }

  moveUp(item:any) {
    console.log('up', item);
    this.plantillaService.upPlantilla(item).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log('HTTP Error', err);
      },
      () => {
        this.getDocumentos();
      }
    );
  }

  moveDown(item:any) {
    console.log('down', item);
    this.plantillaService.downPlantilla(item).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log('HTTP Error', err);
      },
      () => {
        this.getDocumentos();
      }
    );
  }

}
