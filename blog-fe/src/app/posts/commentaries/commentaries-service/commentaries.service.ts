import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApproveCommentary } from 'src/app/_models/approveCommentary';
import { CommentariesSpecParams } from 'src/app/_models/commentariesSpecParams';
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

  getCommentaries(
    commentariesSpecParams: CommentariesSpecParams
  ): Observable<Commentary[]> {
    let params = new HttpParams();

    params = params.append('pageIndex', commentariesSpecParams.pageIndex);
    params = params.append('pageSize', commentariesSpecParams.pageSize);
    params = params.append('sort', commentariesSpecParams.sort);

    if (commentariesSpecParams.search) {
      params = params.append('search', commentariesSpecParams.search);
    }

    if (commentariesSpecParams.postId) {
      params = params.append('postId', commentariesSpecParams.postId);
    }

    if (commentariesSpecParams.userId) {
      params = params.append('userId', commentariesSpecParams.userId);
    }

    return this.http.get<Commentary[]>(`${this.serviceUrl}`, { params: params });
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
    return this.http.delete(`${this.serviceUrl}/${id.toString()}`);
  }
}
