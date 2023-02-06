import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-rendicion',
  templateUrl: './rendicion.component.html',
  styleUrls: ['./rendicion.component.css']
})
export class RendicionComponent implements OnInit {
  rendiciones: any = [];
  rendicionesTemp: any = [];
  rendicionGroups: { [key: string]: any } = [];
  URL = environment.api;

  constructor(
    private api: HomeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getRendiciones()
  }

  goBack() {
    this.location.back();
  }


  getRendiciones() {
    this.api.getAllRendiciones().subscribe
      (res => {
        this.rendiciones = res;
        this.rendicionesTemp = res;
        this.groupAndSortDocumentsByManagement();
        console.log("rendiciones", this.rendiciones)
        console.log("Grupo de rendiciones", this.rendicionGroups)
      });
  }

  // getDocuments(): void {
  //   this.documentService.getDocuments()
  //     .subscribe(documents => {
  //       this.documents = documents;
  //       this.groupDocumentsByManagement();
  //     });
  // }

  groupRendicionesByManagement(): void {
    this.rendicionGroups = this.rendiciones.serverResponse.reduce((groups: any, document: any) => {
      const gestion = document.gestion;
      if (!groups[gestion]) {
        groups[gestion] = [];
      }
      groups[gestion].push(document);
      return groups;
    }, {});


  }

  groupAndSortDocumentsByManagement(): void {
    this.rendicionGroups = this.rendiciones.serverResponse.reduce((groups: any, document: any) => {
      const gestion = document.gestion;
      console.log(gestion)
      if (!groups[gestion]) {
        groups[gestion] = [];
      }
      groups[gestion].push(document);
      return groups;
    }, {});

    // Ordena las claves de los grupos por gestión de mayor a menor
    this.rendicionGroups = Object.keys(this.rendicionGroups)
      .sort((a, b) => b.localeCompare(a))
      .reduce((groups: any, key) => {
        groups[key] = this.rendicionGroups[key];

        return groups;
      }, {});
  }




}
