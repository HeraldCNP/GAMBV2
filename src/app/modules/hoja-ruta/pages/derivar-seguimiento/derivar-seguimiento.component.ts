import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RutaService } from '../../services/ruta.service';

@Component({
  selector: 'app-derivar-seguimiento',
  templateUrl: './derivar-seguimiento.component.html',
  styleUrls: ['./derivar-seguimiento.component.css']
})
export class DerivarSeguimientoComponent implements OnInit {
  URL = environment.api;
  idHr:any;
  idSegui:any;
  units:any = [];
  derivarForm: FormGroup = new FormGroup({});

  /*variables data HR*/
  nuit: string = "";
  referenciaHr: string = "";
  origenHr: string = "";
   /*end variables data HR*/

   /* variablesSeguimiento*/
  copiaSegui: boolean = false;
  asociadoSegui: boolean = false;
  oficinaSegui:string =""
   /*end variablesSeguimiento*/

  constructor(
    private activeRouter: ActivatedRoute,
    private apiUnit: AuthService,
    private apiRuta: RutaService,
    ) { }

  ngOnInit(): void {
    this.idHr = this.activeRouter.snapshot.paramMap.get('idHr');
    this.idSegui = this.activeRouter.snapshot.paramMap.get('idSegui');
    this.createform(),
    this.getUnits();
    this.getHojaderuta(),
    this.getSegui(),
    console.log(this.idHr, this.idSegui)
  }

  getUnits(){
    this.apiUnit.getAllUnits().subscribe
    (res => {
      this.units = res;
      console.log(res)
    });
  }


  createform(){
    this.derivarForm = new FormGroup({
      title : new FormControl('', Validators.required),
      subtitle : new FormControl('', Validators.required),
      body : new FormControl('', Validators.required),
      iframe : new FormControl(''),
      category : new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    })
  }


  getHojaderuta(){
    if (this.idHr !== null) {
      this.apiRuta.getHr(this.idHr).subscribe(data => {
        console.log(data.nuit);
        this.nuit = data.nuit;
        this.referenciaHr = data.referencia;
        this.origenHr = data.origen;
      }, error => {
        console.log(error);
      })
    }
  }
  

  getSegui() {
    if (this.idSegui !== null) {
      this.apiRuta.getSegui(this.idSegui).subscribe(data => {
        console.log("SEguimiento>>>",data);
        this.copiaSegui = data.copia;
        this.asociadoSegui = data.asociado;
        this.oficinaSegui = data.destino;
        console.log(this.oficinaSegui);
        this.apiRuta.getUserPost(this.oficinaSegui).subscribe(data => {
          console.log(">>>>>>", data)
          // this.users = data.serverResponse;
          // console.log(this.users)
          // this.nombre = this.users.username + " " + this.users.surnames
          // console.log(this.nombre)
        }, error => {
          console.log(error);
        })
        //  this.nombre=this.segui.nombre;
      }, error => {
        // console.log(error);
      })
    }
    else {
      // this.nombre = this.identity.username + " " + this.identity.surnames;
      // this.oficinaSegui = this.identity.post
    }
  }
}
