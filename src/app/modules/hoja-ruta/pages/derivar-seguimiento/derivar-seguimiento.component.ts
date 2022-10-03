import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../auth/services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RutaService } from '../../services/ruta.service';
import { Segui } from '../../models/seguimiento';
import { Hojaruta } from '../../models/hojaruta';
@Component({
  selector: 'app-derivar-seguimiento',
  templateUrl: './derivar-seguimiento.component.html',
  styleUrls: ['./derivar-seguimiento.component.css'],
})
export class DerivarSeguimientoComponent implements OnInit {
  URL = environment.api;
  user:any;
  data:any;
  idHr: any;
  idSegui: any;
  units: any = [];
  cargos: any = [];
  derivarForm: FormGroup = new FormGroup({});
  usuario: any = [];

  /*variables data HR*/
  nuit: string = '';
  referenciaHr: string = '';
  origenHr: string = '';
  /*end variables data HR*/

  /* variablesSeguimiento*/
  copiaSegui: boolean = false;
  asociadoSegui: boolean = false;
  oficinaSegui: string = '';
  /*end variablesSeguimiento*/
  /* variablesregistro*/
  //segui: any = [];
  origenen: string = 'ENVIADO';
  origendev: string = 'DERIVADO';
  today = new Date();
  flac: string = '';
  /* end variablesregistro*/

  /* mensaje de error*/
  textError: string;
  mostrarError: boolean;
  mostrarError1: boolean;
  textError1: string;
  /* mensaje de error*/
  titulo = 'derivar documento';
  params: string = '';
  params2: string = '';
  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private apiUnit: AuthService,
    private apiRuta: RutaService,
    private router: Router
  ) {
    this.derivarForm = this.fb.group({
      destino: ['', Validators.required],
      detalles: ['', Validators.required],
    });
    this.mostrarError = false;
    this.textError = '';
    this.mostrarError1 = false;
    this.textError1 = '';
  }

  ngOnInit(): void {
    this.idHr = this.activeRouter.snapshot.paramMap.get('idHr');
    this.idSegui = this.activeRouter.snapshot.paramMap.get('idSegui');
    this.createform(), this.getUnits(), this.getSub();
    this.getHojaderuta(), this.getSegui();
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user);
  }

  getUnits() {
    this.apiUnit.getAllUnits().subscribe((res) => {
      this.units = res;
      console.log(res);
    });
  }


  getSub() {
    if (this.params !== null) {
      this.apiRuta.obtenerOrg(this.params).subscribe(data => {
        this.cargos = data.subdirecciones;
      }, error => {
        console.log(error);
      })
    }
  }

  getUser(){
    if (this.params !== null) {
      this.apiRuta.getUserPost(this.derivarForm.get('destino')?.value).subscribe(data => {
        this.usuario = data;
        console.log(this.usuario)
        this.params2 = this.user.post
        if (this.params2 === this.data.post) {
          this.flac = "si"
        } else
          this.flac = "no"
      })
    }
  }




  createform() {
    this.derivarForm = new FormGroup({
      // unidad: new FormControl('', Validators.required),
      destino: new FormControl('', Validators.required),
      detalles: new FormControl('', Validators.required),
    });
  }

  getHojaderuta() {
    if (this.idHr !== null) {
      this.apiRuta.getHr(this.idHr).subscribe(
        (data) => {
          this.nuit = data.nuit;
          this.referenciaHr = data.referencia;
          this.origenHr = data.origen;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getSegui() {
    if (this.idSegui !== null) {
      this.apiRuta.getSegui(this.idSegui).subscribe(
        (data) => {
          this.copiaSegui = data.copia;
          this.asociadoSegui = data.asociado;
          this.oficinaSegui = data.destino;
          this.apiRuta.getUserPost(this.oficinaSegui).subscribe(
            (data) => {
              // this.users = data.serverResponse;
              // console.log(this.users)
              // this.nombre = this.users.username + " " + this.users.surnames
              // console.log(this.nombre)
            },
            (error) => {
              console.log(error);
            }
          );
          //  this.nombre=this.segui.nombre;
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      // this.nombre = this.identity.username + " " + this.identity.surnames;
      // this.oficinaSegui = this.identity.post
    }
  }

  registerSegui() {
    const SEGUI: Segui = {
      nuit: this.nuit,
      referencia: this.referenciaHr,
      origenhr: this.origenHr,
      copia: this.copiaSegui,
      asociado: this.asociadoSegui,
      oficina: this.oficinaSegui,
      //nombre:this.nombre,
      destino: this.derivarForm.get('destino')?.value,
      detalles: this.derivarForm.get('detalles')?.value,
    };
    const HOJA: Hojaruta = {
      estado: this.origenen,
    };
    const SEGUIS: Segui = {
      estado: this.origendev,
      fecharespuesta: this.today,
    };
    if (this.idHr !== null && this.flac === 'no') {
      this.apiRuta.EditarSegui(this.idHr, SEGUI).subscribe(
        (data) => {
          this.router.navigate(['/hoja-ruta/correspondencia']);
          if (this.idSegui !== null) {
            this.apiRuta.EditarSeguis(this.idSegui, SEGUIS).subscribe(
              (data) => {},
              (error) => {
                console.log(error);
              }
            );
          }
          console.log(SEGUI);
        },
        (error) => {
          console.log(error);
          //this.seguiForm.reset();
        }
      );
      this.apiRuta.EditarHoja(this.idHr, HOJA).subscribe(
        (data) => {},
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.error('No se puede derivar a su propia oficina');
      return;
    }
  }

  error(valor: string) {
    this.mostrarError = true;
    this.textError = valor;

    // Mostramos error por 4 segundos
    setTimeout(() => {
      this.mostrarError = false;
    }, 4000);
  }
}
