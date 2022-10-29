import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatMap } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { PostsService } from '../posts-service/posts.service';

@Component({
  selector: 'app-create-edit-post',
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.scss'],
})
export class CreateEditPostComponent implements OnInit {
  createEditPostForm: FormGroup;

  constructor(
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createEditPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      content: ['', Validators.required],
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
      },
      error: () => this.snackBar.open('Something went wrong!'),
    });
  }
}
