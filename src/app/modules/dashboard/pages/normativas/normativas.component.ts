import { Component, inject } from '@angular/core';
import { PlantillaService } from 'src/app/modules/plantilla-doc/services/plantilla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-normativas',
  templateUrl: './normativas.component.html',
  styleUrls: ['./normativas.component.css']
})
export class NormativasComponent {
  readonly URL = environment.api;
  private plantillaService = inject(PlantillaService)
  tipos:any;

  ngOnInit(): void {
    this.cargarNormativas()
  }

  cargarNormativas() {
    this.plantillaService.getAllTipos()
      .subscribe((data: any) => {
        this.tipos = data.serverResponse;
        console.log(this.tipos);
      });
  }
}
