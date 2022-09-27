import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UnitsComponent } from './pages/units/units.component';
import { ChargesComponent } from './pages/charges/charges.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children:[
      {path: 'forgot', component: ForgotComponent},
      // {path: 'index', component: DashboardComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'unit/index', component: UnitsComponent},
      {path: 'charge/index/:id', component: ChargesComponent},
      {path: '**', redirectTo:'login'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
