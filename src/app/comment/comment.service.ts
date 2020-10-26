import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ToasterService } from '../toaster/toaster.service';
import { CommentModel } from './comment.model';
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

  getCommentsOnPost(postId: number): Observable<CommentModel[]> {
    return this.httpClient.get(`${this.commentUrl}/by-post/${postId}`).pipe(
      catchError((error) => {
        console.log('error: ', error);
        return of(error);
      })
    );
  }
}
