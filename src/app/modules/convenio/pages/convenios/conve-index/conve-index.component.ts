import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConvenioService } from '../../../services/convenio.service';

@Component({
  selector: 'app-conve-index',
  templateUrl: './conve-index.component.html',
  styleUrls: ['./conve-index.component.css']
})
export class ConveIndexComponent implements OnInit {
  convenios: any[] = [];
  URL = environment.api;

  constructor(
    private api: ConvenioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getConvenios()
  }

  addConvenio(){
    this.router.navigate(['convenio/convenio/create'])
  }


  getConvenios(){
    this.api.getAllConvenios().subscribe(
      res => {
        this.convenios = res;
        console.log(this.convenios)
      }
    );
  }

  getMontoTotal(){
    let montoTotal: number = 0;
    if(this.convenios){
      this.convenios.forEach(convenio => {
        convenio.entidades.forEach(function (con: any) {
            montoTotal = montoTotal + con.monto 
          })
          console.log(montoTotal)
          montoTotal = 0
      })
    }
    return montoTotal;
  }


  sumarDias(fecha: any, dias: any){
    let fechaFin = new Date(fecha)
    fechaFin.setDate(fechaFin.getDate() + dias);
    // console.log(fechaFin.toISOString())
    return fechaFin.toISOString();
  }

}
