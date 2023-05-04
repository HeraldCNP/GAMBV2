import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GacetaService } from '../../../services/gaceta.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-reglamento-index',
  templateUrl: './reglamento-index.component.html',
  styleUrls: ['./reglamento-index.component.css']
})
export class ReglamentoIndexComponent implements OnInit {

  reglamentos: any = [];
  reglamento: any;
  idReglamento: any;
  date = new Date();
  URL = environment.api;
  status: any;
  showModal: boolean = false;
  addForm: any;
  editForm: any;
  files: any = [];
  progress: number = 0;
  reglamentoId: any;

  constructor(private router: Router, private api: GacetaService, private fb: FormBuilder) {
    this.addForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      fecha: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      archivo: new FormControl('', Validators.required),
    });

    this.editForm = this.fb.group({
      titulo: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      archivo: [''],
    });
  }

  ngOnInit(): void {
    this.getReglamentos()
  }

  getReglamentos() {
    this.api.getAllReglamentos().subscribe
      (res => {
        this.reglamentos = res;
        console.log(this.reglamentos)
      });
  }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado)
    this.api.changeEstadoReglamento(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getReglamentos();
        }
      );
  }

  changeStatus2(id: any, publico: any) {
    let fd = new FormData();
    fd.append('publico', publico);
    console.log(publico)
    this.api.changeEstadoReglamento(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getReglamentos();
        }
      );
  }

  deleteReglamento(id: string) {
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
        this.api.deleteReglamento(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getReglamentos()
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
    this.reglamentoId = id;
  }

  addArchivo(form: FormData) {
    let fd = new FormData();
    fd.append('titulo', this.addForm.value.titulo);
    fd.append('fecha', this.addForm.value.fecha);
    fd.append('file', this.files[0]);
    this.api.registerReglamento(fd).subscribe(
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
        this.getReglamentos();
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

  cargarDataEdit(reglamento: any) {
    // console.log("Rendi Edit", pei)
    this.editForm.setValue({
      titulo: reglamento.titulo,
      fecha: reglamento.fecha.substr(0, 10),
      archivo: null
    });
    this.idReglamento = reglamento._id;
  }

  editReglamento() {
    let fd = new FormData();

    if (this.files[0]) {
      fd.append('titulo', this.editForm.value.titulo);
      fd.append('fecha', this.editForm.value.fecha);
      fd.append('archivo', this.files[0]);
    } else {
      fd.append('titulo', this.editForm.value.titulo);
      fd.append('fecha', this.editForm.value.fecha);
    }

    // let fd = new FormData();

    console.log(this.idReglamento)

    this.api.editarReglamento(fd, this.idReglamento).subscribe(
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
        this.getReglamentos();
      }
    );
  }


}
