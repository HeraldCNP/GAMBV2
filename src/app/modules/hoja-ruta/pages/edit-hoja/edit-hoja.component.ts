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
  
  
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.esEditar()
  }
  registerHojas(){
    const HOJA1: Hojaruta = {
      origen: this.hojaForm.get('origen')?.value,
      tipodoc: this.hojaForm.get('tipodoc')?.value,
      contacto: this.hojaForm.get('contacto')?.value,
      referencia: this.hojaForm.get('referencia')?.value,
      fechadocumento: this.hojaForm.get('fechadocumento')?.value,
    }
    if (this.id !== null) {
      //ediar usuario
      this.api.EditarHoja  (this.id, HOJA1).subscribe(data =>{
        this.router.navigate(['/ruta/hojaRutas']);
      }, error => {
        console.log(error);
        this.hojaForm.reset();
      })
    }
  }
  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Hoja de Ruta';
      this.api.obtenerHoja(this.id).subscribe(data => {
        this.hoja=data.serverResponse
        this.hojaForm.setValue({
          origen: data.serverResponse.origen,
          tipodoc: null,
          contacto: null,
          referencia: data.serverResponse.referencia,
          fechadocumento: data.serverResponse.fechadocumento,
        })

      }, error => {
        console.log("no hay id" + error);
      })
    }
  }
}
