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
import { EntiIndexComponent } from './pages/entidades/enti-index/enti-index.component';
import { EntiCreateComponent } from './pages/entidades/enti-create/enti-create.component';
import { EntiUpdateComponent } from './pages/entidades/enti-update/enti-update.component';
import { ConveCreateComponent } from './pages/convenios/conve-create/conve-create.component';
import { ConveIndexComponent } from './pages/convenios/conve-index/conve-index.component';
import { ConveUpdateComponent } from './pages/convenios/conve-update/conve-update.component';
import { ConveFileComponent } from './pages/convenios/conve-file/conve-file.component';
import { ConveTransfeComponent } from './pages/convenios/conve-transfe/conve-transfe.component';
import { SeeTransfeComponent } from './pages/convenios/see-transfe/see-transfe.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    RepreCreateComponent,
    RepreIndexComponent,
    RepreUpdateComponent,
    EntiIndexComponent,
    EntiCreateComponent,
    EntiUpdateComponent,
    ConveCreateComponent,
    ConveIndexComponent,
    ConveUpdateComponent,
    ConveFileComponent,
    ConveTransfeComponent,
    SeeTransfeComponent
  ],
  imports: [
    CommonModule,
    ConvenioRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ConvenioModule { }
