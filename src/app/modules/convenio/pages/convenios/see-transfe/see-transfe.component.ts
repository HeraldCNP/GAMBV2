import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConvenioService } from '../../../services/convenio.service';

@Component({
  selector: 'app-see-transfe',
  templateUrl: './see-transfe.component.html',
  styleUrls: ['./see-transfe.component.css']
})
export class SeeTransfeComponent implements OnInit {
  convenioId: any;
  convenio: any;
  URL = environment.api;
  constructor(
    private api: ConvenioService,
    private activeRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.convenioId = this.activeRouter.snapshot.paramMap.get('id');
    this.getconvenio();

  }


  getconvenio(){
      this.api.getSingleConvenio(this.convenioId).subscribe(data => {
        this.convenio = data;
        console.log(this.convenio)
      })
  }

  sumarDias(fecha: any, dias: any){
    let fechaFin = new Date(fecha)
    fechaFin.setDate(fechaFin.getDate() + dias);
    // console.log(fechaFin.toISOString());
    return fechaFin.toISOString();
  }

}
