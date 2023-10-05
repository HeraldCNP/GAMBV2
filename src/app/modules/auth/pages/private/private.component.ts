import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  user:any;
  data:any;
  constructor() { }
  itemsMenu = [
    {label: 'Plantillas', url: '/doc/modelos/list'}
  ]
  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
  }



}
