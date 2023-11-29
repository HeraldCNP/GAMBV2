import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashsboardComponent } from './pages/dashsboard/dashsboard.component';
import { ModelIndexComponent } from './pages/modelos/model-index/model-index.component';
import { DocumentIndexComponent } from './pages/documentos/document-index/document-index.component';
import { ModelListComponent } from './pages/modelos/model-list/model-list.component';
import { DocNormativaComponent } from './pages/normativas/doc-normativa/doc-normativa.component';
import { TiposNormativaComponent } from './pages/normativas/tipos-normativa/tipos-normativa.component';
import { PrestamosIndexComponent } from './pages/prestamos/prestamos-index/prestamos-index.component';
import { AmortizacionCreateComponent } from './pages/prestamos/amortizacion-create/amortizacion-create.component';
import { EjecucionPresupuestariaComponent } from './pages/ejecucion-presupuestaria/ejecucion-presupuestaria.component';
import { EvaluacionComponent } from './pages/evaluacion/evaluacion.component';

const routes: Routes = [
  {
    path: '', component: DashsboardComponent,
    children:[
      { path: 'modelos/index', component: ModelIndexComponent },
      { path: 'documentos/index', component: DocumentIndexComponent },
      { path: 'modelos/list', component: ModelListComponent },
      { path: 'normativas/tipos/index', component: TiposNormativaComponent},
      { path: 'normativas/doc/index', component: DocNormativaComponent },
      { path: 'prestamos/index', component: PrestamosIndexComponent },
      { path: 'plantillas/addAmortizacion/:id', component: AmortizacionCreateComponent },
      { path: 'ejecucion-presupuestaria/index', component: EjecucionPresupuestariaComponent },
      { path: 'evaluacion/index', component: EvaluacionComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantillaDocRoutingModule { }
