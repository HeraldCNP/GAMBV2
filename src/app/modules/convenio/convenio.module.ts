import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvenioRoutingModule } from './convenio-routing.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ConvenioRoutingModule
  ]
})
export class ConvenioModule { }
