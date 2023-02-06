import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { GacetaService } from '../../../services/gaceta.service';

@Component({
  selector: 'app-rendicion-index',
  templateUrl: './rendicion-index.component.html',
  styleUrls: ['./rendicion-index.component.css']
})
export class RendicionIndexComponent implements OnInit {
  rendiciones: any = [];
  rendicion: any;
  idRendicion: any;
  date = new Date();
  URL = environment.api;
  status: any;
  showModal: boolean = false;
  addForm: any;
  editForm: any;
  files: any = [];
  progress: number = 0;
  poaId: any;
  constructor(private router: Router, private api: GacetaService, private fb: FormBuilder) {
    this.addForm = new FormGroup({
      gestion: new FormControl(2023, Validators.required),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      archivo: new FormControl('', Validators.required),
    });

    this.editForm = this.fb.group({
      gestion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      archivo: [''],
    });
  }

  ngOnInit(): void {
    this.getRendiciones();
  }

  getRendiciones() {
    this.api.getAllRendiciones().subscribe((res) => {
      this.rendiciones = res;
      console.log(this.rendiciones);
    });
  }

  // addPoa() {
  //   this.router.navigate(['docAdmin/poa/create']);
  // }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado);
    this.api.changeEstadoRendicion(id, fd).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.getRendiciones();
      }
    );
  }

  generatePDF() { }

  getPoa(id: any) {
    this.api.getGaceta(id).subscribe(
      (res) => {
        this.rendicion = res.serverResponse;
        console.log(this.rendicion);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.showModal = true;
      }
    );
  }

  updateCuenta(id: string) {
    this.router.navigate(['docAdmin/poa/update', id]);
  }

  deleteRendicion(id: string) {
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
        this.api.deleteRendicion(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.getRendiciones()
        );
      }
    });
  }

  get form() {
    return this.addForm.controls;
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  getId(id: string) {
    this.poaId = id;
  }

  addArchivo(form: FormData) {
    let fd = new FormData();
    fd.append('gestion', this.addForm.value.gestion);
    fd.append('descripcion', this.addForm.value.descripcion);
    fd.append('file', this.files[0]);
    this.api.registerRendiciones(fd).subscribe(
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
        this.getRendiciones();
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

  cargarDataEdit(rendicion: any) {
    // console.log("Rendi Edit", rendicion)
    this.editForm.setValue({
      gestion: rendicion.gestion,
      descripcion: rendicion.descripcion,
      archivo: null
    });
    this.idRendicion = rendicion._id;
  }

  editRendicion() {
    let fd = new FormData();

    if (this.files[0]) {
      fd.append('gestion', this.editForm.value.gestion);
      fd.append('descripcion', this.editForm.value.descripcion);
      fd.append('archivo', this.files[0]);
    } else {
      fd.append('gestion', this.editForm.value.gestion);
      fd.append('descripcion', this.editForm.value.descripcion);
    }

    // let fd = new FormData();

    console.log(this.idRendicion)

    this.api.editarRendicion(fd, this.idRendicion).subscribe(
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
        this.getRendiciones();
      }
    );
  }

}
