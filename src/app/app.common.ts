import { CommentComponent } from '@components/comment/comment.component';
import { FeedComponent } from '@components/feed/feed.component';
import { HeaderComponent } from '@components/header/header.component';
import { HomeComponent } from '@components/home/home.component';
import { LoginComponent } from '@components/auth/login/login.component';
import { PostTitleComponent } from '@components/shared/post-title/post-title.component';
import { PostViewer } from '@components/post/post-viewer.component';
import { RegisterComponent } from '@components/auth/register/register.component';
import { SideBarComponent } from '@components/shared/side-bar/side-bar.component';
import { SubredditComponent } from '@components/subreddit/subreddit.component';
import { SubredditSideBarComponent } from '@components/shared/subreddit-side-bar/subreddit-side-bar.component';
import { VoteButtonComponent } from '@components/shared/vote-button/vote-button.component';

export const AppCommonDeclaration = [
  HeaderComponent,
  LoginComponent,
  RegisterComponent,
  HomeComponent,
  PostTitleComponent,
  SideBarComponent,
  SubredditSideBarComponent,
  VoteButtonComponent,
  SubredditComponent,
  CommentComponent,
  PostViewer,
  FeedComponent,
];
