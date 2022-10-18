import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children:[

      {path: '**', redirectTo:'dashboard', pathMatch: 'full'},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvenioRoutingModule { }
