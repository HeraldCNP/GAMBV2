import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  //standalone: true,
 // imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  {
  user:any;
  data:any;

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
    console.log(this.data);
    
  }


}
