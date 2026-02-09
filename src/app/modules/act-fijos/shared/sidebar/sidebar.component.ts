import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  ngOnInit(): void {
  }
  autorizacionOpen: boolean = false;
  ordenOpen: boolean = false;
  gastosOpen: boolean = false;


  toggleGastosMenu() {
    this.gastosOpen = !this.gastosOpen;
  }

  toggleAutorizacionMenu() {
    this.autorizacionOpen = !this.autorizacionOpen;
  }

  toggleOrdenMenu() {
    this.ordenOpen = !this.ordenOpen;
  }


}
