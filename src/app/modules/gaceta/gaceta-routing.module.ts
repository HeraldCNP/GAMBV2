import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GacetaCreateComponent } from './pages/gaceta/gaceta-create/gaceta-create.component';
import { GacetaIndexComponent } from './pages/gaceta/gaceta-index/gaceta-index.component';
import { GacetaUpdateComponent } from './pages/gaceta/gaceta-update/gaceta-update.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'gaceta/index', component: GacetaIndexComponent },
      { path: 'gaceta/create', component: GacetaCreateComponent },
      { path: 'gaceta/update/:id', component: GacetaUpdateComponent },

      { path: '**', redirectTo: 'dashboard' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GacetaRoutingModule { }
