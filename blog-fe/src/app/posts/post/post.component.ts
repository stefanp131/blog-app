import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { toHTML } from 'ngx-editor';
import { Post } from 'src/app/_models/post';
import { PostsService } from '../posts-service/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  private _post: Post;

  @Input() set post(value: Post) {
    this._post = value;
    this.getHTMLFromValue(this._post);
  }

  get post(): Post {
    return this._post;
  }
  @Output() postDeleted = new EventEmitter();

  constructor(
    private postsService: PostsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getHTMLFromValue(post: Post) {
    this._post.content = toHTML(JSON.parse(post.content));
  }

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
