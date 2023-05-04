import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomeService } from '../../../services/home.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {

  auditorias: any = [];
  auditoriasTemp: any = [];
  auditoriasGroups: { [key: string]: any } = [];
  URL = environment.api;

  constructor(private api: HomeService,
    private location: Location) { }

  ngOnInit(): void {
    this.getRendiciones()
  }

  goBack() {
    this.location.back();
  }


  getRendiciones() {
    this.api.getAllAuditorias().subscribe
      (res => {
        this.auditorias = res;
        this.auditoriasTemp = res;
        this.groupAndSortDocumentsByManagement();
        console.log("auditorias", this.auditorias)
        console.log("Grupo de auditorias", this.auditoriasGroups)
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
    this.auditoriasGroups = this.auditorias.serverResponse.reduce((groups: any, document: any) => {
      const gestion = document.gestion;
      if (!groups[gestion]) {
        groups[gestion] = [];
      }
      groups[gestion].push(document);
      return groups;
    }, {});


  }

  groupAndSortDocumentsByManagement(): void {
    this.auditoriasGroups = this.auditorias.serverResponse.reduce((groups: any, document: any) => {
      const gestion = document.gestion;
      console.log(gestion)
      if (!groups[gestion]) {
        groups[gestion] = [];
      }
      groups[gestion].push(document);
      return groups;
    }, {});

    // Ordena las claves de los grupos por gestión de mayor a menor
    this.auditoriasGroups = Object.keys(this.auditoriasGroups)
      .sort((a, b) => b.localeCompare(a))
      .reduce((groups: any, key) => {
        groups[key] = this.auditoriasGroups[key];

        return groups;
      }, {});
  }

}
