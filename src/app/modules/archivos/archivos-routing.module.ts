import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CarpetaIndexComponent } from './pages/carpetas/carpeta-index/carpeta-index.component';
import { CarpetaCreateComponent } from './pages/carpetas/carpeta-create/carpeta-create.component';
import { ContaIndexComponent } from './pages/conta/conta-index/conta-index.component';
import { DocIndexComponent } from './pages/conta/doc-index/doc-index.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'carpetas/index', component: CarpetaIndexComponent },
      { path: 'carpetas/create', component: CarpetaCreateComponent },
      { path: 'conta/index', component: ContaIndexComponent },
      { path: 'conta/docs/index', component: DocIndexComponent },
      // { path: 'compra/update/:id', component: CompraUpdateComponent },

      // { path: 'poa/index', component: PoaIndexComponent },
      // { path: 'poa/create', component: PoaCreateComponent },
      // { path: 'poa/update/:id', component: PoaUpdateComponent },

      // { path: 'ptdi/index', component: PtdiIndexComponent },
      // { path: 'ptdi/create', component: PtdiCreateComponent },
      // { path: 'ptdi/update/:id', component: PtdiUpdateComponent },

      { path: '**', redirectTo: 'dashboard' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivosRoutingModule { }
