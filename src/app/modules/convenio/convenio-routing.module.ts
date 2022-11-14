import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RepreCreateComponent } from './pages/representantes/repre-create/repre-create.component';
import { RepreIndexComponent } from './pages/representantes/repre-index/repre-index.component';
import { RepreUpdateComponent } from './pages/representantes/repre-update/repre-update.component';
import { EntiIndexComponent } from './pages/entidades/enti-index/enti-index.component';
import { EntiCreateComponent } from './pages/entidades/enti-create/enti-create.component';
import { EntiUpdateComponent } from './pages/entidades/enti-update/enti-update.component';
import { ConveIndexComponent } from './pages/convenios/conve-index/conve-index.component';
import { ConveCreateComponent } from './pages/convenios/conve-create/conve-create.component';
import { ConveUpdateComponent } from './pages/convenios/conve-update/conve-update.component';
import { ConveFileComponent } from './pages/convenios/conve-file/conve-file.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children:[
      {path: 'representante/index', component: RepreIndexComponent},
      {path: 'representante/create', component: RepreCreateComponent},
      {path: 'representante/update/:id', component: RepreUpdateComponent},
      {path: 'entidad/index', component: EntiIndexComponent},
      {path: 'entidad/create', component: EntiCreateComponent},
      {path: 'entidad/update/:id', component: EntiUpdateComponent},
      {path: 'convenio/index', component: ConveIndexComponent},
      {path: 'convenio/create', component: ConveCreateComponent},
      {path: 'convenio/update/:id', component: ConveUpdateComponent},
      {path: 'convenio/addFile/:id', component: ConveFileComponent},
      {path: '**', redirectTo:'dashboard', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvenioRoutingModule { }
