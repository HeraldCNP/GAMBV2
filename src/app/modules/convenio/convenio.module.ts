import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConvenioRoutingModule } from './convenio-routing.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { RepreCreateComponent } from './pages/representantes/repre-create/repre-create.component';
import { RepreIndexComponent } from './pages/representantes/repre-index/repre-index.component';
import { RepreUpdateComponent } from './pages/representantes/repre-update/repre-update.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    RepreCreateComponent,
    RepreIndexComponent,
    RepreUpdateComponent
  ],
  imports: [
    CommonModule,
    ConvenioRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ConvenioModule { }
