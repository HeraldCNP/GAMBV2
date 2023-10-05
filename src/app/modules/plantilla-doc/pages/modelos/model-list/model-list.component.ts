import { Component, inject } from '@angular/core';
import { PlantillaService } from '../../../services/plantilla.service';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent {

  private plantillaService = inject(PlantillaService)
  modelos:any;
  ngOnInit(): void {
    this.cargarModelos()
  }

  cargarModelos() {
    this.plantillaService.getAllModelos()
      .subscribe((data: any) => {
        this.modelos = data.serverResponse;
        // console.log(this.modelos.serverResponse);
      });
  }

}
