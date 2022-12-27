import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { environment } from '../../../../../environments/environment';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postId: any;
  post: any;
  URL = environment.api;
  constructor(private activeRouter: ActivatedRoute, private router: Router, private api:HomeService) { }

  ngOnInit(): void {

    this.activeRouter.params
    .pipe(
      switchMap( ({ id }) => this.api.getSinglePost( id ) )
    )
    .subscribe( resp => {
      this.post = resp.serverResponse;
      console.log(resp)
    })
  }
  

}
