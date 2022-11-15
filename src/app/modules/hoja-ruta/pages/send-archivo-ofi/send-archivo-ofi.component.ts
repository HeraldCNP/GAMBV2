import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../auth/services/auth.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { RutaService } from '../../services/ruta.service';
import { Segui } from '../../models/seguimiento';
import { Hojaruta } from '../../models/hojaruta';
import { Arch } from '../../models/archivo';
@Component({
  selector: 'app-send-archivo-ofi',
  templateUrl: './send-archivo-ofi.component.html',
  styleUrls: ['./send-archivo-ofi.component.css']
})
export class SendArchivoOfiComponent implements OnInit {
  user: any;
  data: any;
  derivarForm: FormGroup = new FormGroup({});
  titulo = 'archivar el documento';
  cargos: any = [];
  segui: any = [];
  idHr: any;
  idSegui: any;
  estadoEnv: string = 'ARCHIVO OFICINA';
  constructor( private apiRuta: RutaService,
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
    ) {  this.derivarForm = this.fb.group({
      destino: ['', Validators.required],
      detalles: ['', Validators.required],
    });}

  ngOnInit(): void {
    this.idHr = this.activeRouter.snapshot.paramMap.get('idHr');
    this.idSegui = this.activeRouter.snapshot.paramMap.get('idSegui');
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
    this.getSub();
    this.getSegui();
  }
  SendFile(){
    const ARCH: Arch = {
      destino: this.derivarForm.get('destino')?.value,
      description: this.derivarForm.get('detalles')?.value,
    };
    const ARCH1: Segui = {
      estado: this.estadoEnv
    }
    console.log(ARCH);
    if(this.idSegui !== null){
      this.apiRuta.addArch(this.idSegui, ARCH).subscribe((data) =>{
        this.apiRuta.EditarSeguis(this.idSegui,ARCH1).subscribe((data)=>{
          this.router.navigate(['/ruta/office/index']);
        },(error) => {
          console.log(error);
        })
      },(error) => {
        console.log(error);
        this.derivarForm.reset();
      })
    }
  }
  getSub() {
      this.apiRuta.obtenerSubUni(this.data.post).subscribe(
        (data) => {
          this.cargos = data.archivofi;
        },
        (error) => {
          console.log(error);
        }
      );   
  }
  getSegui() {
    if (this.idSegui !== null) {
      this.apiRuta.getSegui(this.idSegui).subscribe((data) => {
       this.segui = data
       console.log(this.segui)
      });
    }
  }
}
