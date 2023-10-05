import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashsboardComponent } from './pages/dashsboard/dashsboard.component';
import { ModelIndexComponent } from './pages/modelos/model-index/model-index.component';
import { DocumentIndexComponent } from './pages/documentos/document-index/document-index.component';
import { ModelListComponent } from './pages/modelos/model-list/model-list.component';

const routes: Routes = [
  {
    path: '', component: DashsboardComponent,
    children:[
      { path: 'modelos/index', component: ModelIndexComponent },
      { path: 'documentos/index', component: DocumentIndexComponent },
      { path: 'modelos/list', component: ModelListComponent },
      // { path: 'plantillas/update/:id', component: GacetaUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantillaDocRoutingModule { }
