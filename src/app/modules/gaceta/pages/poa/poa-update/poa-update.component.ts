import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GacetaService } from '../../../services/gaceta.service';

@Component({
  selector: 'app-poa-update',
  templateUrl: './poa-update.component.html',
  styleUrls: ['./poa-update.component.css'],
})
export class PoaUpdateComponent implements OnInit {
  idUser: any;
  user: any;
  data: any;
  editarForm: any;
  poaId: any;
  datosPoa:any;
  constructor(
    private api: GacetaService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.editarForm = new FormGroup({
      gestion: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      usuario: new FormControl(this.idUser, Validators.required),
    });

    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    // this.getEntidades();
    this.poaId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getPoa(this.poaId).subscribe((data) => {
      this.datosPoa = data.serverResponse;
      console.log('Doc', this.datosPoa);
      this.editarForm.setValue({
        gestion: this.datosPoa.gestion,
        descripcion: this.datosPoa.descripcion,
        usuario: this.idUser,
      });
    });
  }

  get form() {
    return this.editarForm.controls;
  }

  editarPoa() {
    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();

    fd.append('gestion', this.editarForm.value.gestion);
    fd.append('descripcion', this.editarForm.value.descripcion);
    fd.append('usuario', this.idUser);

    this.api.editarPoa(fd, this.poaId).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log('HTTP Error', err);
      },
      () => {
        this.router.navigate(['docAdmin/poa/index']),
          this.alertOk('success', 'Exito', 'Poa Editado Correctamente', '2000');
      }
    );
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
    this.router.navigate(['docAdmin/poa/index']);
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
        this.api.deleteDocumentoPoa(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.router.navigate(['docAdmin/poa/index'])
        );
      }
    })
  }
}
