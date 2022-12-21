import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mision',
  templateUrl: './mision.component.html',
  styleUrls: ['./mision.component.css']
})
export class MisionComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  goBack(){
    this.location.back();
  }
}
