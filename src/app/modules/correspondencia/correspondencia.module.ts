import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorrespondenciaRoutingModule } from './correspondencia-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxPrintModule } from 'ngx-print';
import { LoaderDirective } from 'src/app/core/directives/loader.directive';
import { MaterialModule } from 'src/app/material/material.module';
import { SelectYearComponent } from 'src/app/components/select-year/select-year.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CorrespondenciaRoutingModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FormsModule,
    NgxPrintModule,
    LoaderDirective,
    MaterialModule
  ]
})
export class CorrespondenciaModule { }
