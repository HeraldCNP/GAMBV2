import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HojaRutaRoutingModule } from './hoja-ruta-routing.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HojaRutaRoutingModule
  ]
})
export class HojaRutaModule { }
