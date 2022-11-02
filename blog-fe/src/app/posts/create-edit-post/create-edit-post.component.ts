import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, schema, toDoc, Toolbar } from 'ngx-editor';
import { Post } from 'src/app/_models/post';
import { AccountService } from 'src/app/_services/account.service';
import { PostsService } from '../posts-service/posts.service';
import { Validators as NgxEditorValidators } from 'ngx-editor';
import { UpdatePost } from 'src/app/_models/updatePost';
import { CreatePost } from 'src/app/_models/createPost';

@Component({
  selector: 'app-create-edit-post',
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.scss'],
})
export class CreateEditPostComponent implements OnInit, OnDestroy {
  createEditPostForm: FormGroup;
  id: number;
  editPost: Post;
  @Output() postCreated = new EventEmitter();
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

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
    this.editor = new Editor({ schema: schema });
    if (!!this.id) {
      this.initEditForm();
      console.log('edit');
    } else {
      this.initCreateForm();
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  initCreateForm() {
    this.createEditPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      content: [
        '',
        [
          NgxEditorValidators.required(schema),
          NgxEditorValidators.maxLength(2000, schema),
        ],
      ],
    });
  }

  initEditForm() {
    this.postsService.getPostById(this.id).subscribe({
      next: (post) => {
        this.editPost = post;
        this.createEditPostForm = this.formBuilder.group({
          title: [this.editPost.title, Validators.required],
          category: [this.editPost.category, Validators.required],
          content: [
            JSON.parse(this.editPost.content),
            [
              NgxEditorValidators.required(schema),
              NgxEditorValidators.maxLength(2000, schema),
            ],
          ],
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
    const createEditFormValue: UpdatePost = {...this.createEditPostForm.value};

    createEditFormValue.content = JSON.stringify(createEditFormValue.content);

    this.postsService
      .updatePostById(this.id, createEditFormValue)
      .subscribe({
        next: () => {
          this.router.navigate(['/posts']);
          this.snackBar.open('Post has been updated!');
        },
        error: () => this.snackBar.open('Something went wrong!'),
      });
  }

  create() {
    const createEditFormValue: CreatePost = {
      ...this.createEditPostForm.value,
      dateCreated: new Date(Date.now()),
      createdBy: this.accountService.currentUserSource.value.username,
    };

    createEditFormValue.content = JSON.stringify(toDoc(createEditFormValue.content));

    this.postsService.createPost(createEditFormValue).subscribe({
      next: () => {
        this.snackBar.open('Post has been created!');
        this.postCreated.emit();
      },
      error: () => this.snackBar.open('Something went wrong!'),
    });
  }
}
