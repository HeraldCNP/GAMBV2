import { Component, inject } from '@angular/core';
import { PlantillaService } from 'src/app/modules/plantilla-doc/services/plantilla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css']
})
export class PlantillasComponent {
  readonly URL = environment.api;
  private plantillaService = inject(PlantillaService)
  modelos:any;
  ngOnInit(): void {
    this.cargarModelos()
  }

  cargarModelos() {
    this.plantillaService.getAllModelos()
      .subscribe((data: any) => {
        this.modelos = data.serverResponse;
        console.log(this.modelos);
      });
  }
}
