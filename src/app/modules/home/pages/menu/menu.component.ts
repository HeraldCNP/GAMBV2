import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user: any;
  data: any;

  constructor() { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
  }

}
