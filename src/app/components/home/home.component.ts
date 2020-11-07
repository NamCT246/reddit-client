import { Component, OnInit } from '@angular/core';

import { PostService } from '@services/post/post.service';
import { AuthService } from '@services/auth/auth.service';
import { PostModel } from '@models/post/post-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Array<PostModel> = [];

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.showUserPosts();
  }

  showUserPosts() {
    this.postService
      .getPostsByUsername(this.authService.currentUser.username)
      .subscribe((data) => {
        this.posts = data;
      });
  }
}
