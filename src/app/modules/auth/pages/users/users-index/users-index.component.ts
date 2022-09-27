import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent implements OnInit {
  users:any;
  constructor(
    private api:AuthService,

  ) { }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe(
      data => {
        this.users = data;
      }
    );


    
  }



}
