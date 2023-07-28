import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CarpetaIndexComponent } from './pages/carpetas/carpeta-index/carpeta-index.component';
import { CarpetaCreateComponent } from './pages/carpetas/carpeta-create/carpeta-create.component';
import { ContaIndexComponent } from './pages/conta/conta-index/conta-index.component';
import { DocIndexComponent } from './pages/conta/doc-index/doc-index.component';
import { PrevenCreateComponent } from './pages/conta/docs/preven/preven-create/preven-create.component';
import { DevenCreateComponent } from './pages/conta/docs/deven/deven-create/deven-create.component';
import { PrevenListComponent } from './pages/conta/docs/preven/preven-list/preven-list.component';
import { AreaIndexComponent } from './pages/areas/area-index/area-index.component';
import { PrevenEditComponent } from './pages/conta/docs/preven/preven-edit/preven-edit.component';
import { DevenListComponent } from './pages/conta/docs/deven/deven-list/deven-list.component';
import { DevenEditComponent } from './pages/conta/docs/deven/deven-edit/deven-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'areas/index', component: AreaIndexComponent },

      { path: 'carpetas/index', component: CarpetaIndexComponent },
      { path: 'carpetas/create', component: CarpetaCreateComponent },

      { path: 'conta/index', component: ContaIndexComponent },
      { path: 'conta/docs/index', component: DocIndexComponent },

      { path: 'conta/docs/preven/:id', component: PrevenCreateComponent },
      { path: 'conta/docs/preven/list/:id', component: PrevenListComponent },
      { path: 'conta/docs/preven/edit/:id', component: PrevenEditComponent },

      { path: 'conta/docs/deven/:id', component: DevenCreateComponent },
      { path: 'conta/docs/deven/list/:id', component: DevenListComponent },
      { path: 'conta/docs/deven/edit/:id', component: DevenEditComponent },

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
