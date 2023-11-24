import { Component, inject } from '@angular/core';
import { GacetaService } from 'src/app/modules/gaceta/services/gaceta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent {
  readonly URL = environment.api;
  private gacetaService = inject(GacetaService)

  poas:any;
  ptdis:any;
  peis:any;

  ngOnInit(): void {
    this.getAllPoas();
    this.getAllPtdis();
    this.getAllPeis();
  }



  getAllPoas() {
    this.gacetaService.getAllPoas().subscribe((res) => {
      this.poas = res;
      console.log('poas', this.poas);
    });
  }

  getAllPtdis() {
    this.gacetaService.getAllPtdis().subscribe
      (res => {
        this.ptdis = res;
        console.log(this.ptdis)
      });
  }

  getAllPeis() {
    this.gacetaService.getAllPeis().subscribe
      (res => {
        this.peis = res;
        console.log(this.peis)
      });
  }

}
