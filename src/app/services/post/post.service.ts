import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CommentModel } from '@models/comment/comment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { PostModel } from '@models/post/post-model';
import { ToasterService } from '../toaster/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = 'http://localhost:8080/api/posts';

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
