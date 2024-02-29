import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActFijosRoutingModule } from './act-fijos-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ActFijosRoutingModule
  ]
})
export class ActFijosModule { }
