import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantillaDocRoutingModule } from './plantilla-doc-routing.module';
import { DashsboardComponent } from './pages/dashsboard/dashsboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ModelIndexComponent } from './pages/modelos/model-index/model-index.component';
import { DocumentIndexComponent } from './pages/documentos/document-index/document-index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { ModelListComponent } from './pages/modelos/model-list/model-list.component';
import { TiposNormativaComponent } from './pages/normativas/tipos-normativa/tipos-normativa.component';
import { DocNormativaComponent } from './pages/normativas/doc-normativa/doc-normativa.component';
import { PrestamosIndexComponent } from './pages/prestamos/prestamos-index/prestamos-index.component';
import { AmortizacionCreateComponent } from './pages/prestamos/amortizacion-create/amortizacion-create.component';



@NgModule({
  declarations: [
    DashsboardComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ModelIndexComponent,
    DocumentIndexComponent,
    ModelListComponent,
    TiposNormativaComponent,
    DocNormativaComponent,
    PrestamosIndexComponent,
    AmortizacionCreateComponent
  ],
  imports: [
    CommonModule,
    PlantillaDocRoutingModule,
    ReactiveFormsModule,
    NgxSelectModule,
  ]
})
export class PlantillaDocModule { }
