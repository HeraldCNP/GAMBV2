import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ConvenioService } from '../../../services/convenio.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-repre-create',
  templateUrl: './repre-create.component.html',
  styleUrls: ['./repre-create.component.css']
})
export class RepreCreateComponent implements OnInit {
  URL = environment.api;
  entidades:any = [];
  entidadId:any;
  datoEntidad:any;
  representanteForm:any;


  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) {

    this.entidadId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSingleEntidad(this.entidadId).subscribe(data => {
      this.datoEntidad = data;
      console.log("Id:",this.entidadId);
      console.log("Dato Entidad:",this.datoEntidad);
      this.representanteForm = this.fb.group({
        entidad: [this.datoEntidad._id],
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        apellidos: ['', [Validators.required, Validators.minLength(3)]],
        cargo: ['', [Validators.required]],
        telefono: ['', []],
        ci: ['', []],
        email: ['', []],
      })
    })

   }

  ngOnInit(): void {
    // this.getEntidades(),
  }

  crearRepresentante(form: any) {
    this.api.addrepresentante(form, this.entidadId)
      .subscribe(
        res => {
          this.router.navigate(['convenio/entidad/index']),
            this.alertOk('success', 'Exito', 'Representante Creado Correctamente', '2000')
        }
      );
  }

  editarEntidad(form:any){
    
    this.api.editarEntidad(form, this.entidadId)
      .subscribe(
        res => {
          this.router.navigate(['convenio/entidad/index']),
            this.alertOk('success', 'Exito', 'Entidad Editada Correctamente', '2000')
        }
      );
  }

  getEntidades(){
    this.api.getAllEntidades().subscribe
    (res => {
      this.entidades = res; 
      // console.log(this.entidades);
    });
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }

  get form() {
    return this.representanteForm.controls;
  }


  cancel() {
    this.router.navigate(['convenio/representante/index'])
  }
}
