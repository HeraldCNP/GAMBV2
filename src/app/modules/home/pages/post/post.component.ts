import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { environment } from '../../../../../environments/environment';

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
    this.getNoticia()
  }
  getNoticia(){
    this.postId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSinglePost(this.postId).subscribe(data => {
      this.post = data.serverResponse;
      // console.log(data.serverResponse);
      this.getNoticia()
    })
  }
}
