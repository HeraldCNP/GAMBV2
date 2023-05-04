import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RendicionComponent } from '../home/pages/itemTransparencia/rendicion/rendicion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GacetaCreateComponent } from './pages/gaceta/gaceta-create/gaceta-create.component';
import { GacetaIndexComponent } from './pages/gaceta/gaceta-index/gaceta-index.component';
import { GacetaUpdateComponent } from './pages/gaceta/gaceta-update/gaceta-update.component';
import { PoaAddComponent } from './pages/poa/poa-add/poa-add.component';
import { PoaCreateComponent } from './pages/poa/poa-create/poa-create.component';
import { PoaIndexComponent } from './pages/poa/poa-index/poa-index.component';
import { PoaUpdateComponent } from './pages/poa/poa-update/poa-update.component';
import { PtdiCreateComponent } from './pages/ptdi/ptdi-create/ptdi-create.component';
import { PtdiIndexComponent } from './pages/ptdi/ptdi-index/ptdi-index.component';
import { PtdiUpdateComponent } from './pages/ptdi/ptdi-update/ptdi-update.component';
import { RendicionIndexComponent } from './pages/rendicion/rendicion-index/rendicion-index.component';
import { PeiIndexComponent } from './pages/pei/pei-index/pei-index.component';
import { ReglamentoIndexComponent } from './pages/reglamento/reglamento-index/reglamento-index.component';
import { AuditoriaIndexComponent } from './pages/auditoria/auditoria-index/auditoria-index.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'gaceta/index', component: GacetaIndexComponent },
      { path: 'gaceta/create', component: GacetaCreateComponent },
      { path: 'gaceta/update/:id', component: GacetaUpdateComponent },

      { path: 'poa/index', component: PoaIndexComponent },
      { path: 'poa/create', component: PoaCreateComponent },
      { path: 'poa/update/:id', component: PoaUpdateComponent },
      { path: 'poa/add/:id', component: PoaAddComponent },

      { path: 'ptdi/index', component: PtdiIndexComponent },
      { path: 'ptdi/create', component: PtdiCreateComponent },
      { path: 'ptdi/update/:id', component: PtdiUpdateComponent },

      { path: 'cuentas/index', component: RendicionIndexComponent},

      { path: 'pei/index', component: PeiIndexComponent},

      { path: 'reglamento/index', component: ReglamentoIndexComponent},

      { path: 'auditoria/index', component: AuditoriaIndexComponent},
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
export class GacetaRoutingModule { }
