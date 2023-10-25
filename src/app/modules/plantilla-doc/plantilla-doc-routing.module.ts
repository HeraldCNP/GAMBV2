import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashsboardComponent } from './pages/dashsboard/dashsboard.component';
import { ModelIndexComponent } from './pages/modelos/model-index/model-index.component';
import { DocumentIndexComponent } from './pages/documentos/document-index/document-index.component';
import { ModelListComponent } from './pages/modelos/model-list/model-list.component';
import { DocNormativaComponent } from './pages/normativas/doc-normativa/doc-normativa.component';
import { TiposNormativaComponent } from './pages/normativas/tipos-normativa/tipos-normativa.component';

const routes: Routes = [
  {
    path: '', component: DashsboardComponent,
    children:[
      { path: 'modelos/index', component: ModelIndexComponent },
      { path: 'documentos/index', component: DocumentIndexComponent },
      { path: 'modelos/list', component: ModelListComponent },
      { path: 'normativas/tipos/index', component: TiposNormativaComponent},
      { path: 'normativas/doc/index', component: DocNormativaComponent },
      // { path: 'plantillas/update/:id', component: GacetaUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantillaDocRoutingModule { }
