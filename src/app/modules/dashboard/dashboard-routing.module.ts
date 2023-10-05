import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './pages/main/main.component';
import { PlantillasComponent } from './pages/plantillas/plantillas.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent,
    children:[
      { path: 'main', component: MainComponent },
      { path: 'plantillas', component: PlantillasComponent },
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
