import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-ptdi',
  templateUrl: './ptdi.component.html',
  styleUrls: ['./ptdi.component.css']
})
export class PtdiComponent implements OnInit {
  ptdis: any = [];
  ptdisTemp: any = [];
  URL = environment.api;
  constructor(
    private api: HomeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPtdis();
  }

  goBack(){
    this.location.back();
  }

  getPtdis(){
    this.api.getAllPtdis().subscribe
    (res => {
      this.ptdis = res;
      this.ptdisTemp = res;
      console.log(this.ptdis)
    });
  }

}
