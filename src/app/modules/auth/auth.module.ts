import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './pages/register/register.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { PrivateComponent } from './pages/private/private.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UnitsComponent } from './pages/units/units.component';
import { ChargesComponent } from './pages/charges/charges.component';
import { UsersIndexComponent } from './pages/users/users-index/users-index.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { LoaderDirective } from 'src/app/core/directives/loader.directive';


@NgModule({
  declarations: [
    RegisterComponent,
    ForgotComponent,
    PrivateComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    UnitsComponent,
    ChargesComponent,
    UsersIndexComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSelectModule,
    LoaderDirective
  ]
})
export class AuthModule { }
