import { Component, OnInit } from '@angular/core';

declare function customInitFunctions():void;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    customInitFunctions();
  }



}
