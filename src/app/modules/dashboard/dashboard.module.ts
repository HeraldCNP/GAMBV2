import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './pages/main/main.component';
import { PlantillasComponent } from './pages/plantillas/plantillas.component';
import { NormativasComponent } from './pages/normativas/normativas.component';
import { PrestamosComponent } from './pages/prestamos/prestamos/prestamos.component';
import { PlanificacionComponent } from './pages/planificacion/planificacion.component';
import { EjecucionPresupuestariaComponent } from './pages/ejecucion-presupuestaria/ejecucion-presupuestaria.component';
import { SeguimientoEvaluacionComponent } from './pages/seguimiento-evaluacion/seguimiento-evaluacion.component';


@NgModule({
  declarations: [
    IndexComponent,
    MainComponent,
    PlantillasComponent,
    NormativasComponent,
    PrestamosComponent,
    PlanificacionComponent,
    EjecucionPresupuestariaComponent,
    SeguimientoEvaluacionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
