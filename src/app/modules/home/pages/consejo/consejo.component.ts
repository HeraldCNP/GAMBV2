import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consejo',
  templateUrl: './consejo.component.html',
  styleUrls: ['./consejo.component.css']
})
export class ConsejoComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  goBack(){
    this.location.back();
  }
}
