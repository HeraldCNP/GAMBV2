
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [SafePipe],
  imports: [CommonModule],
  exports: [SafePipe]  // 👈 Exporta el pipe para que otros módulos lo usen
})
export class SharedModule {}