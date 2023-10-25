import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './pages/main/main.component';
import { PlantillasComponent } from './pages/plantillas/plantillas.component';
import { NormativasComponent } from './pages/normativas/normativas.component';


@NgModule({
  declarations: [
    IndexComponent,
    MainComponent,
    PlantillasComponent,
    NormativasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
