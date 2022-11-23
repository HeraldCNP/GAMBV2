import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvenioService } from '../../../services/convenio.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-repre-update',
  templateUrl: './repre-update.component.html',
  styleUrls: ['./repre-update.component.css']
})
export class RepreUpdateComponent implements OnInit {

  representanteId: any;
  datosRepresentante: any;
  editarForm: any = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    cargo: new FormControl('', Validators.required),
    telefono: new FormControl(''),
    ci: new FormControl(''),
    email: new FormControl('')

  })

  constructor(
    private activeRouter: ActivatedRoute,
    private api: ConvenioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.representanteId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSingleRepresentante(this.representanteId).subscribe(data => {
      this.datosRepresentante = data;
      // console.log(data);
      this.editarForm.setValue({
        'nombre': this.datosRepresentante.nombre,
        'apellidos': this.datosRepresentante.apellidos,
        'cargo': this.datosRepresentante.cargo,
        'telefono': this.datosRepresentante.telefono,
        'ci': this.datosRepresentante.ci,
        'email': this.datosRepresentante.email,
      });
    })
  }

  editarRepresentante(form:any){
    this.api.editarRepresentante(form, this.representanteId)
      .subscribe(
        res => {
          this.router.navigate(['convenio/representante/index']),
            this.alertOk('success', 'Exito', 'Representante Editado Correctamente', '2000')
        }
      );
  }

  alertOk(icon:any, title:any, text:any, timer:any){
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }

  cancel(){
    this.router.navigate(['convenio/representante/index'])
  }

}
