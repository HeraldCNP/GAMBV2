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
  URL = environment.api;
  constructor(private api: HomeService) { }

  ngOnInit(): void {
    this.getGacetas()
  }

  getGacetas(){
    this.api.getAllGacetas().subscribe
    (res => {
      this.gacetas = res;
      console.log(this.gacetas)
    });
  }

}
