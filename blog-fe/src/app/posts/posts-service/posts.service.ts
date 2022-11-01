import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePost } from 'src/app/_models/createPost';
import { Post } from 'src/app/_models/post';
import { UpdatePost } from 'src/app/_models/updatePost';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  serviceUrl = environment.apiUrl + 'posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.serviceUrl);
  }

  createPost(createPost: CreatePost) {
    return this.http.post(this.serviceUrl, createPost);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.serviceUrl}/${id.toString()}`);
  }

  updatePostById(id: number, updatePost: UpdatePost) {
    return this.http.put(`${this.serviceUrl}/${id.toString()}`, updatePost);
  }

  deletePostById(id: number) {
    return this.http.delete(`${this.serviceUrl}/${id.toString()}`);
  }
}
