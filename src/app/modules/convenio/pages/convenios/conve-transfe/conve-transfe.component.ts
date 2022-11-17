import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConvenioService } from '../../../services/convenio.service';

@Component({
  selector: 'app-conve-transfe',
  templateUrl: './conve-transfe.component.html',
  styleUrls: ['./conve-transfe.component.css']
})
export class ConveTransfeComponent implements OnInit {
  URL = environment.api;
  convenioId: any;
  enti:any;
  transfeForm: any;
  files:any;
  progress = 0;
  datosConvenio: any;
  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) {
    this.transfeForm = this.fb.group({
      entidad: ['', [Validators.required]],
      cuenta: ['', [Validators.required]],
      importe: ['', [Validators.required]],
      fuente: ['', [Validators.required]],
      comprobante: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.convenioId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSingleConvenio(this.convenioId).subscribe(data => {
      this.datosConvenio = data.entidades;
      console.log(data)
      console.log("entidades", this.datosConvenio)
      console.log(data.transferencia.length);
      this.enti=data.transferencia;
    })
  }


  uploadTransfe() {
    let fd = new FormData();
    fd.append('entidad', this.transfeForm.value.entidad);
    fd.append('cuenta', this.transfeForm.value.cuenta);
    fd.append('importe', this.transfeForm.value.importe);
    fd.append('fuente', this.transfeForm.value.fuente);
    fd.append('comprobante', this.files[0]);
    let saldo:any = 0;
    let total =0;
    this.datosConvenio.forEach((element:any) => {
      if(this.transfeForm.value.entidad==element.entidad){
        total = element.monto
      }
   });
    let totaltrans=this.transfeForm.value.importe
    this.enti.forEach((element: any) => {
      if(this.transfeForm.value.entidad==element.entidad){
        totaltrans = totaltrans + element.importe

      }
    });
    saldo=total-totaltrans
    console.log(saldo)
    fd.append('totaldes', totaltrans);
    fd.append('saldo', saldo);
    if(totaltrans<=total){
      this.api.addTransfe(fd, this.convenioId)
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          }
        },
        err => {
          console.log('HTTP Error', err)
          this.progress = 0;
        },
        () => {
            this.progress = 0;
            this.router.navigate(['convenio/convenio/index']),
            this.alertOk('success', 'Exito', 'Transferencia Registrada Correctamente', '2000')
        }
      );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El total de tranferencias no debe superar el monto total', 
      })
    }
    
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }

  get form(){
    return this.transfeForm.controls;
  }

  onChange($event:any) {
    this.files = $event.target.files;
  }
}
