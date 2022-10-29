import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/_models/post';
import { AccountService } from 'src/app/_services/account.service';
import { PostsService } from '../posts-service/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  $posts: Observable<Post[]>;

  constructor(
    private postsService: PostsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.$posts = this.postsService.getPosts();
  }
}
