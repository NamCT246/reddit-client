import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SubRedditModel } from '../subreddit/subreddit.model';

@Injectable({
  providedIn: 'root',
})
export class SubRedditService {
  baseUrl: string = 'http://localhost:8080/api/subreddit';

  constructor(private httpClient: HttpClient) {}

  //TODO: will temporarily fetch a subreddit
  getFeaturedSubReddit(): Observable<SubRedditModel[]> {
    return this.httpClient.get<SubRedditModel[]>(`${this.baseUrl}/1`);
  }
}
