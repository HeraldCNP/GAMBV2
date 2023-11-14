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

  constructor(){

  }

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

  isNew(datePlantilla:any) {
    const today:any = new Date();
    const publishDate:any = new Date(datePlantilla);

    const diffTime = Math.abs(today - publishDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // console.log(diffDays);
    return diffDays <= 16;
  }

}

