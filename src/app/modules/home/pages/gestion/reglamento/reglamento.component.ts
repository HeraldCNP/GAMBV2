import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reglamento',
  templateUrl: './reglamento.component.html',
  styleUrls: ['./reglamento.component.css']
})
export class ReglamentoComponent implements OnInit {
  reglamentos: any = [];
  reglamentosTemp: any = [];
  URL = environment.api;

  constructor(private api: HomeService,
    private location: Location) { }

  ngOnInit(): void {
    this.getReglamentos()
  }

  goBack() {
    this.location.back();
  }

  getReglamentos(){
    this.api.getAllReglamentos().subscribe
    (res => {
      this.reglamentos = res;
      this.reglamentosTemp = res;
      console.log(this.reglamentos)
    });
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.reglamentos = this.reglamentosTemp;
    }
    this.api.searchReglamento(termino).subscribe
    (res => {
      this.reglamentos = res;
      console.log(this.reglamentos)
    });
  }


}
