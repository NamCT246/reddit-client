import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

import { ToasterService } from '../toaster/toaster.service';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';

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

  getPostsByUsername(username: string): Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>(
      `${this.baseUrl}/by-user/${username}`
    );
  }
}
