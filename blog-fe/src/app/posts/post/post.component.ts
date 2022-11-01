import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/_models/post';
import { PostsService } from '../posts-service/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Output() postDeleted = new EventEmitter();

  constructor(
    private postsService: PostsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  delete() {
    this.postsService.deletePostById(this.post.id).subscribe({
      next: () => {
        this.postDeleted.emit();
        this.snackBar.open('Post has been deleted');
      },
      error: () => {
        this.snackBar.open('Something went wrong');
      },
    });
  }
}
