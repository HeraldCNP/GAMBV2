import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private almacenService: AlmacenService) { }

  ngOnInit(): void {
  }



}

