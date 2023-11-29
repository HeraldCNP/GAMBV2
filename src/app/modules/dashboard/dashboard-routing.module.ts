import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './pages/main/main.component';
import { PlantillasComponent } from './pages/plantillas/plantillas.component';
import { NormativasComponent } from './pages/normativas/normativas.component';
import { PrestamosComponent } from './pages/prestamos/prestamos/prestamos.component';
import { PlanificacionComponent } from './pages/planificacion/planificacion.component';
import { EjecucionPresupuestariaComponent } from './pages/ejecucion-presupuestaria/ejecucion-presupuestaria.component';
import { SeguimientoEvaluacionComponent } from './pages/seguimiento-evaluacion/seguimiento-evaluacion.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent,
    children:[
      { path: 'main', component: MainComponent },
      { path: 'plantillas', component: PlantillasComponent },
      { path: 'normativas', component: NormativasComponent },
      { path: 'prestamos', component: PrestamosComponent },
      { path: 'planificacion', component: PlanificacionComponent },
      { path: 'ejecucion-presupuestaria', component: EjecucionPresupuestariaComponent },
      { path: 'seguimiento-evaluacion', component: SeguimientoEvaluacionComponent },
      // { path: 'modelos/list', component: ModelListComponent },
      // { path: 'plantillas/update/:id', component: GacetaUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
