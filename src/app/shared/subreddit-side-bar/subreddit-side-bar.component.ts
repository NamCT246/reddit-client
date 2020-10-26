import { Component, OnInit } from '@angular/core';

import { SubRedditModel } from '../../subreddit/subreddit.model';

import { SubRedditService } from '../../subreddit/subreddit.service';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css'],
})
export class SubredditSideBarComponent implements OnInit {
  subreddits: Array<SubRedditModel> = [];
  displayViewAll: boolean;

  constructor(private subRedditService: SubRedditService) {
    this.subRedditService.getFeaturedSubReddit().subscribe((data) => {
      this.subreddits = data;
    });
  }

  ngOnInit(): void {}
}
