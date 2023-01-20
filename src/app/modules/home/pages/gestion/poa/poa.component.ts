import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-poa',
  templateUrl: './poa.component.html',
  styleUrls: ['./poa.component.css']
})
export class PoaComponent implements OnInit {
  poas: any = [];
  poasTemp: any = [];
  URL = environment.api;
  constructor(
    private api: HomeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPoas();
  }

  goBack(){
    this.location.back();
  }

  getPoas(){
    this.api.getAllPoas().subscribe
    (res => {
      this.poas = res;
      this.poasTemp = res;
      console.log(this.poas)
    });
  }

}
