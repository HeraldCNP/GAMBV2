import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  tiposOpen: boolean = false;
  documentosOpen: boolean = false;

  toggleTiposMenu() {
    this.tiposOpen = !this.tiposOpen;
  }

  toggleDocumentosMenu() {
    this.documentosOpen = !this.documentosOpen;
  }

}
