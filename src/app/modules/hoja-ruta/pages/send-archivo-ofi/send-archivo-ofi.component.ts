import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../auth/services/auth.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { RutaService } from '../../services/ruta.service';
import { Segui } from '../../models/seguimiento';
import { Hojaruta } from '../../models/hojaruta';
import Swal from 'sweetalert2';
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
  estadoEnv: string = 'FILE OFICINA';
  sigla:any;
  ofi:any;
  constructor( private apiRuta: RutaService,
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
    ) {  this.derivarForm = this.fb.group({
      destino: ['', Validators.required],
      detalles: ['', Validators.required],
      status: ['']
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
      status: `${this.sigla}/${this.derivarForm.get('destino')?.value}/${this.derivarForm.get('detalles')?.value}`
    };
    const ARCH1: Segui = {
      estado: this.estadoEnv
    }
    console.log(ARCH);
    if(this.idSegui !== null){
      this.apiRuta.addArch(this.idSegui, ARCH).subscribe((data) =>{
        this.apiRuta.EditarSeguis(this.idSegui,ARCH1).subscribe((data)=>{
          this.derivarForm.reset();
          this.getSegui()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se realizó un registro ',
            showConfirmButton: false,
            timer: 1500
          })
          if(this.data.post !== "PRESUPUESTOS TESORERIA Y CREDITO PÚBLICO" && this.data.post !== "ASISTENTE CONTABLE" ){
            console.log(this.data.post)
            this.router.navigate(['/ruta/office/index'])
            console.log("es")
          }else{
            console.log("no es")
          }


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
          this.sigla = data.sigla
          this.ofi = data.nombresubdir
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
      });
    }
  }
}
