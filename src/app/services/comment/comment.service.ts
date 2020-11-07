import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CommentModel } from '@models/comment/comment.model';
import { CommentPayload } from '@models/comment/comment.payload';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { ToasterService } from '../toaster/toaster.service';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  commentUrl = `http://localhost:8080/api/comments`;

  constructor(
    private ngLocalStorage: LocalStorageService,
    private httpClient: HttpClient,
    private toaster: ToasterService
  ) {}

  postComment(payload: CommentPayload): Observable<any> {
    return this.httpClient.post(`${this.commentUrl}/create`, payload).pipe(
      catchError((error) => {
        console.log('error: ', error);
        return of(error);
      })
    );
  }

  getCommentsOnPost(postId: number): Observable<CommentModel[]> {
    return this.httpClient.get(`${this.commentUrl}/by-post/${postId}`).pipe(
      catchError((error) => {
        console.log('error: ', error);
        return of(error);
      })
    );
  }
}
