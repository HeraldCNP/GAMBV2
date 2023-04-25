import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-pei',
  templateUrl: './pei.component.html',
  styleUrls: ['./pei.component.css']
})
export class PeiComponent implements OnInit {

  peis: any = [];
  peisTemp: any = [];
  URL = environment.api;
  constructor(
    private api: HomeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPeis();
  }

  goBack(){
    this.location.back();
  }

  getPeis(){
    this.api.getAllPeis().subscribe
    (res => {
      this.peis = res;
      this.peisTemp = res;
      console.log(this.peis)
    });
  }
}
