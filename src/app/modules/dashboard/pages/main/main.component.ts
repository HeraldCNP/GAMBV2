import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
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
