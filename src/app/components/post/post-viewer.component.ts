import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CommentModel } from '@models/comment/comment.model';
import { CommentPayload } from '@models/comment/comment.payload';
import { CommentService } from '@services/comment/comment.service';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '@models/post/post-model';
import { PostService } from '@services/post/post.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-post-viewer',
  templateUrl: './post-viewer.component.html',
  styleUrls: ['./post-viewer.component.css'],
})
export class PostViewer implements OnInit {
  post: PostModel;
  postId: number;
  comments: Array<CommentModel> = [];
  commentPayload: CommentPayload;
  commentForm: FormGroup;

  constructor(
    private commentService: CommentService,
    private postService: PostService,
    private activeRoute: ActivatedRoute
  ) {
    this.postId = this.activeRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required),
    });

    this.commentPayload = {
      text: '',
      postId: this.postId,
    };
  }

  ngOnInit() {
    this.getPostById();
    this.getCommentsForPost();
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;

    this.commentService.postComment(this.commentPayload).subscribe(
      (data) => {
        this.commentForm.get('text').setValue('');
        this.getCommentsForPost();
      },
      (error) => {
        throwError(error);
      }
    );
  }

  private getPostById() {
    this.postService.getPostByPostId(this.postId).subscribe((data) => {
      this.post = data;
    });
  }

  private getCommentsForPost() {
    this.commentService.getCommentsOnPost(this.postId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
}
