import { Component, inject } from '@angular/core';
import { EvaluacionService } from 'src/app/modules/plantilla-doc/services/evaluacion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seguimiento-evaluacion',
  templateUrl: './seguimiento-evaluacion.component.html',
  styleUrls: ['./seguimiento-evaluacion.component.css']
})
export class SeguimientoEvaluacionComponent {
  private evaluacionService = inject(EvaluacionService);
  evaluaciones: any = [];
  URL = environment.api;

  ngOnInit(): void {
    this.getDocEjecucion();
    // this.getTipos();
  }

  getDocEjecucion() {
    this.evaluacionService.getAllEvaluaciones().subscribe
      (res => {
        this.evaluaciones = res;
        console.log('docs', this.evaluaciones)
      });
  }
}
