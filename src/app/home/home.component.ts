import { Component, OnInit } from '@angular/core';

import { PostService } from '../post/post.service';
import { AuthService } from '../auth/auth.service';
import { PostModel } from '../post/post-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Array<PostModel> = [];

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    // this.showUserPosts();
    this.httpClient
      .get('http://localhost:8080/api/posts/4')
      .subscribe((data) => {
        console.log(data);
      });
  }

  ngOnInit(): void {}

  showUserPosts() {
    this.postService
      .getPostsByUsername(this.authService.getUsername())
      .subscribe((data) => {
        this.posts = data;
      });
  }
}
