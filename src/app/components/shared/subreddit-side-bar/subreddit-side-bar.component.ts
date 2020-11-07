import { Component, OnInit } from '@angular/core';

import { SubRedditModel } from '@models/subreddit/subreddit.model';
import { SubRedditService } from '@services/subreddit/subreddit.service';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css'],
})
export class SubredditSideBarComponent implements OnInit {
  subreddits: Array<SubRedditModel> = [];
  displayViewAll: boolean;

  constructor(private subRedditService: SubRedditService) {
    console.log('instantiated');

    this.subRedditService.getFeaturedSubReddit().subscribe((data) => {
      // console.log(data);
      // this.subreddits = data;
    });
  }

  ngOnInit(): void {}
}
