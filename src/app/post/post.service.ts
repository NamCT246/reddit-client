import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ToasterService } from '../toaster/toaster.service';
import { PostModel } from './post-model';
import { CommentModel } from '../comment/comment.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl: string = 'http://localhost:8080/api/posts';

  constructor(
    private ngLocalStorage: LocalStorageService,
    private httpClient: HttpClient,
    private toaster: ToasterService
  ) {}

  getPostByPostId(postId: number): Observable<PostModel> {
    return this.httpClient.get(`${this.baseUrl}/${postId}`).pipe(
      catchError((error) => {
        console.log('error: ', error);
        return of(error);
      })
    );
  }

  getPostsByUsername(username: string): Observable<PostModel[]> {
    return this.httpClient.get(`${this.baseUrl}/by-user/${username}`).pipe(
      catchError((error) => {
        console.log('error: ', error);
        return of(error);
      })
    );
  }
}
