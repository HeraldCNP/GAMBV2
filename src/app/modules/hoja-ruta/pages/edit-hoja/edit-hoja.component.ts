import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hojaruta } from '../../models/hojaruta';
import { RutaService } from '../../services/ruta.service';
@Component({
  selector: 'app-edit-hoja',
  templateUrl: './edit-hoja.component.html',
  styleUrls: ['./edit-hoja.component.css']
})
export class EditHojaComponent implements OnInit {
  titulo = 'EEDITAR HOJA DE RUTA';
  hojaForm: FormGroup;
  id: string | null;
  hoja : any = [];
  isPago = false;
  hr:any;

  constructor(private api: RutaService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute) {
      this.hojaForm = this.fb.group({
        origen: ['', Validators.required],
        referencia: ['', Validators.required],
        fechadocumento: ['', Validators.required],
        tipodoc: [''],
        contacto: [''],
        beneficiarioPago: [''],
        numCite: [''],
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.isEdit()
  }

  registerHojas(){


    if(this.isPago == true){
      this.hr = {
        origen: this.hojaForm.get('origen')?.value,
        tipodoc: 'pago',
        contacto: this.hojaForm.get('contacto')?.value,
        referencia: this.hojaForm.get('referencia')?.value,
        fechadocumento: this.hojaForm.get('fechadocumento')?.value,
        beneficiarioPago: this.hojaForm.get('beneficiarioPago')?.value,
        numCite: this.hojaForm.get('numCite')?.value,
      }
    }else{
      this.hr = {
        origen: this.hojaForm.get('origen')?.value,
        tipodoc: null,
        contacto: this.hojaForm.get('contacto')?.value,
        referencia: this.hojaForm.get('referencia')?.value,
        fechadocumento: this.hojaForm.get('fechadocumento')?.value,
        beneficiarioPago: this.hojaForm.get('beneficiarioPago')?.value,
        numCite: this.hojaForm.get('numCite')?.value,
      }
    }




    if (this.id !== null) {
      //ediar usuario
      this.api.EditarHoja  (this.id, this.hr).subscribe(data =>{
        this.router.navigate(['/ruta/hojaRutas']);
      }, error => {
        console.log(error);
        this.hojaForm.reset();
      })
    }
  }

  isEdit() {
    if (this.id !== null) {
      this.titulo = 'Editar Hoja de Ruta';
      this.api.obtenerHoja(this.id).subscribe(data => {
        this.hoja=data.serverResponse

        console.log(this.hoja);

        if(this.hoja.tipodoc == 'pago'){
          this.isPago = true;
          this.hojaForm.patchValue({
            origen: this.hoja.origen,
            tipodoc: 'pago',
            contacto: null,
            referencia: this.hoja.referencia,
            fechadocumento: this.hoja.fechadocumento,
            numCite: this.hoja.numCite,
            beneficiarioPago: this.hoja.beneficiarioPago,
          })
        }else{
          this.hojaForm.patchValue({
            origen: data.serverResponse.origen,
            tipodoc: null,
            contacto: null,
            referencia: data.serverResponse.referencia,
            fechadocumento: data.serverResponse.fechadocumento,
            numCite: this.hoja.numCite
          })
        }
      }, error => {
        console.log("no hay id" + error);
      })
    }
  }

  esPago(value:boolean){
    if(value == false){
      this.isPago = false;
    }else{
      this.isPago = true;
    }

  }
}
