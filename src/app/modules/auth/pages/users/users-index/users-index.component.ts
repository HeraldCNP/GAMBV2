import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';
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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe(
      data => {
        this.users = data;
        // console.log(this.users);
      }
    );
  }

  editUser(user:Usuario){
    this.router.navigate(['auth/users/update', user._id])
  }

  deleteUser(user:Usuario){

  }
}
