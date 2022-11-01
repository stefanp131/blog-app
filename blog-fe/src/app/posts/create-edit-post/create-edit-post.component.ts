import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/_models/post';
import { AccountService } from 'src/app/_services/account.service';
import { PostsService } from '../posts-service/posts.service';

@Component({
  selector: 'app-create-edit-post',
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.scss'],
})
export class CreateEditPostComponent implements OnInit {
  createEditPostForm: FormGroup;
  id: number;
  editPost: Post;
  @Output() postCreated = new EventEmitter();

  constructor(
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (!!this.id) {
      this.initEditForm();
      console.log('edit');
    } else {
      this.initCreateForm();
    }
  }

  initCreateForm() {
    this.createEditPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  initEditForm() {
    this.postsService.getPostById(this.id).subscribe({
      next: (post) => {
        this.editPost = post;
        this.createEditPostForm = this.formBuilder.group({
          title: [this.editPost.title, Validators.required],
          category: [this.editPost.category, Validators.required],
          content: [this.editPost.content, Validators.required],
        });
      },
    });
  }

  submit() {
    if (!!this.id) {
      this.update();
    } else {
      this.create();
    }
  }

  private update() {
    this.postsService
      .updatePostById(this.id, this.createEditPostForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/posts']);
          this.snackBar.open('Post has been updated!');
        },
        error: () => this.snackBar.open('Something went wrong!'),
      });
  }

  create() {
    const createEditFormValue = {
      ...this.createEditPostForm.value,
      dateCreated: new Date(Date.now()),
      createdBy: this.accountService.currentUserSource.value.username,
    };

    this.postsService.createPost(createEditFormValue).subscribe({
      next: () => {
        this.snackBar.open('Post has been created!');
        this.postCreated.emit();
      },
      error: () => this.snackBar.open('Something went wrong!'),
    });
  }
}
