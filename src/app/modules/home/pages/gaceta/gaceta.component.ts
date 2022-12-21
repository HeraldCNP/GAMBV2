import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-gaceta',
  templateUrl: './gaceta.component.html',
  styleUrls: ['./gaceta.component.css']
})
export class GacetaComponent implements OnInit {
  gacetas: any = [];
  gacetasTemp: any = [];
  URL = environment.api;
  constructor(
    private api: HomeService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getGacetas()
  }

  goBack(){
    this.location.back();
  }


  getGacetas(){
    this.api.getAllGacetas().subscribe
    (res => {
      this.gacetas = res;
      this.gacetasTemp = res;
      console.log(this.gacetas)
    });
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.gacetas = this.gacetasTemp;
    }
    this.api.searchGaceta(termino).subscribe
    (res => {
      this.gacetas = res;
      // console.log(this.gacetas)
    });
  }
  
  filtrar(titulo:string){
    if(titulo.length === 0){
      return this.gacetas = this.gacetasTemp;
    }
    this.api.getGacetas(titulo).subscribe
    (res => {
      this.gacetas = res;
      // console.log(this.gacetas)
    });
  }
}
