import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from 'src/app/post/post-model';
import { Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css'],
})
export class PostTitleComponent implements OnInit {
  @Input() posts: PostModel[];

  faComments = faComments;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // console.log(posts);
  }

  goToPost(postId: number) {
    this.router.navigateByUrl(`/posts/${postId}`);
  }
}
