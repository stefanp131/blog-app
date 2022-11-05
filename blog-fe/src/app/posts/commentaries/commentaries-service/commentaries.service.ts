import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApproveCommentary } from 'src/app/_models/approveCommentary';
import { Commentary } from 'src/app/_models/commentary';
import { CreateCommentary } from 'src/app/_models/createCommentary';
import { UpdateCommentary } from 'src/app/_models/updateCommentary';
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

  getCommentariesPerUser(userId: number): Observable<Commentary[]> {
    return this.http.get<Commentary[]>(`${this.serviceUrl}?userId=${userId}`);
  }

  createCommentaryForPost(commentary: CreateCommentary) {
    return this.http.post(`${this.serviceUrl}`, commentary);
  }

  updateCommentaryForPost(id: number, commentary: UpdateCommentary) {
    return this.http.put(`${this.serviceUrl}/${id.toString()}`, commentary);
  }

  approveCommentaryForPost(id: number, commentary: ApproveCommentary) {
    return this.http.patch(`${this.serviceUrl}/${id.toString()}`, commentary);
  }

  deleteCommentaryById(id: number) {
    return this.http.delete(`${this.serviceUrl}/${id.toString()}`)
  }
}
