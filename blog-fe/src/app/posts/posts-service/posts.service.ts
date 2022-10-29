import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/_models/post';
import { environment } from 'src/environments/environment';
import { PostsModule } from '../posts.module';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  serviceUrl = environment.apiUrl + 'posts'

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.serviceUrl);
  }
}
