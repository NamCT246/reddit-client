import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PostModel } from '../post/post-model';
import { CommentService } from '../comment/comment.service';
import { CommentModel } from '../comment/comment.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from './post.service';

@Component({
  selector: 'app-post-viewer',
  templateUrl: './post-viewer.component.html',
  styleUrls: ['./post-viewer.component.css'],
})
export class PostViewer implements OnInit {
  post: PostModel;
  comments: Array<CommentModel> = [];
  commentForm: FormGroup;

  constructor(
    private commentService: CommentService,
    private postService: PostService,
    private activeRoute: ActivatedRoute
  ) {
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required),
    });

    this.postService
      .getPostByPostId(this.activeRoute.snapshot.params.id)
      .subscribe((data) => {
        console.log(data);
        this.post = data;
      });

    this.commentService
      .getCommentsOnPost(this.activeRoute.snapshot.params.id)
      .subscribe((data) => {
        console.log(data);
        this.comments = data;
      });
  }

  ngOnInit() {}

  postComment() {}
}
