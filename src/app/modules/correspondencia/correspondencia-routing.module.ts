import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DependenciaIndexComponent } from './pages/dependencias/dependencia-index/dependencia-index.component';
import { TipoIndexComponent } from './pages/tipos/tipo-index/tipo-index.component';
import { CorrespondenciaIndexComponent } from './pages/correspondencias/correspondencia-index/correspondencia-index.component';
import { MiCorrespondeciaIndexComponent } from './pages/correspondencias/mi-correspondecia-index/mi-correspondecia-index.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'dependencia/index', component: DependenciaIndexComponent },
      { path: 'tipo/index', component: TipoIndexComponent },
      { path: 'index', component: CorrespondenciaIndexComponent },
      { path: 'mi/index', component: MiCorrespondeciaIndexComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorrespondenciaRoutingModule { }
