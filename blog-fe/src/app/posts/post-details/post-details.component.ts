import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toHTML } from 'ngx-editor';
import { map, Observable } from 'rxjs';
import { Post } from 'src/app/_models/post';
import { PostsService } from '../posts-service/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  id: number;
  post: Post;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.postsService.getPostById(this.id).subscribe((post) => {
      this.post = post;
      this.post.content = toHTML(JSON.parse(post.content));
    });
  }
}
