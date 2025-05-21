import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SegControlService } from '../../services/segControl.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-seg-control',
  templateUrl: './segControl.component.html',
  styleUrl: './segControl.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegControlComponent implements OnInit {
  user:any;
  userData:any;
  segControl: any = [];
  progress: number = 0;
idDocumento: any;
  addForm: any;
  editForm: any;
  status: any;
  showModal: boolean = false;
  files: any = [];
  URL = environment.api;
  documentoId: any;
  private api = inject(SegControlService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  constructor() {
    this.addForm = this.fb.group({
      titulo: [''],
      fecha: [''],
      archivo: [''],
    });

     this.editForm = this.fb.group({
      titulo: [''],
      fecha: [''],
      archivo: [''],
    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.userData = JSON.parse(this.user)
    this.getSegControl();
  }

  getSegControl() {
    this.api.getAllSegControl().subscribe((res: any) => {
      this.segControl = res;
    });
  }
  getAllSegControlById(id: string) {
    this.api.getAllSegControlById(id).subscribe((res: any) => {
      this.segControl = res;
    });
  }
  getId(id: string) {
    this.documentoId = id;
  }
  createSegControl() {
    const fd = new FormData();
    fd.append('titulo', this.addForm.value.titulo);
    fd.append('fecha', this.addForm.value.fecha);
    fd.append('archivo', this.files[0]);

    this.api.createSegControl(fd).subscribe(
      (event: { type: HttpEventType; loaded: number; total: number }) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }
      },
      (err: any) => {
        console.log('HTTP Error', err);
        this.progress = 0;
      },
      () => {
        this.progress = 0;
        this.getSegControl();
        this.resetForm();

        this.alertOk(
          'success',
          'Exito',
          'Documento Creado Correctamente',
          '2000'
        );
      }
    );
    this.router.navigate(['dashboard/seg-control-interno']);
  }

  get form() {
    return this.addForm.controls;
  }
  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }
  onChange($event: any) {
    this.files = $event.target.files;
  }
   changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado)
    this.api.changeEstado(id, fd)
      .subscribe(
        (        res: any) => {
          console.log(res)
        },
        (        err: any) => console.log('HTTP Error', err),
        () => {
          this.getSegControl();
        }
      );
  }


  resetForm() {
    this.addForm.reset();
  }
  editSegControl(data: any) {
    // console.log("Rendi Edit", pei)
    this.editForm.setValue({
      titulo: data.titulo,
      fecha: data.fecha.substr(0, 10),
      archivo: null,
    });
    this.idDocumento = data._id;
  }
   editDocumento() {
    let fd = new FormData();

    if (this.files[0]) {
      fd.append('titulo', this.editForm.value.titulo);
      fd.append('fecha', this.editForm.value.fecha);
      fd.append('file', this.files[0]);
    } else {
      fd.append('titulo', this.editForm.value.titulo);
      fd.append('fecha', this.editForm.value.fecha);
    }

    this.api.editarSegControl(fd, this.idDocumento).subscribe(
      (res: any) => {

      },
      (err: any) => {
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
        this.getSegControl();
      }
    );
  }


  deleteSegControl(id: string) {
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
        Swal.fire('¡Eliminado!', 'El Documento ha sido eliminado.', 'success');
        this.api.deleteSegControl(id).subscribe(
          (res: any) => console.log(res),
          (err: any) => console.log('HTTP Error', err),
          () => this.getSegControl()
        );
      }
    });
  }

  // Add any additional methods or properties you need for this component
}
