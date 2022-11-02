import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentary } from 'src/app/_models/commentary';
import { CreateCommentary } from 'src/app/_models/createCommentary';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentariesService {
  serviceUrl = environment.apiUrl + 'commentaries';

  constructor(private http: HttpClient) {}

  getCommentariesPerPost(postId: number): Observable<Commentary[]> {
    return this.http.get<Commentary[]>(`${this.serviceUrl}?postId=${postId}`);
  }

  createCommentaryForPost(commentary: CreateCommentary) {
    return this.http.post(`${this.serviceUrl}`, commentary);
  }
}
