import { Component, inject } from '@angular/core';
import { EjecucionService } from 'src/app/modules/plantilla-doc/services/ejecucion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ejecucion-presupuestaria',
  templateUrl: './ejecucion-presupuestaria.component.html',
  styleUrls: ['./ejecucion-presupuestaria.component.css']
})
export class EjecucionPresupuestariaComponent {
  private ejecucionService = inject(EjecucionService);
  docEjecucion: any = [];
  URL = environment.api;

  ngOnInit(): void {
    this.getDocEjecucion();
    // this.getTipos();
  }

  getDocEjecucion() {
    this.ejecucionService.getAllDocEjecucion().subscribe
      (res => {
        this.docEjecucion = res;
        console.log('docs', this.docEjecucion)
      });
  }
}
