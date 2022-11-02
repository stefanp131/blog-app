import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateCommentary } from 'src/app/_models/createCommentary';
import { AccountService } from 'src/app/_services/account.service';
import { CommentariesService } from '../commentaries-service/commentaries.service';

@Component({
  selector: 'app-create-commentary',
  templateUrl: './create-commentary.component.html',
  styleUrls: ['./create-commentary.component.scss'],
})
export class CreateCommentaryComponent implements OnInit {
  @Input() postId: number;
  @Output() commentaryCreated = new EventEmitter();
  createCommentaryForm: FormGroup;

  constructor(
    private commentariesService: CommentariesService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createCommentaryForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  submit() {
    const createCommentaryFormValue: CreateCommentary = {
      ...this.createCommentaryForm.value,
      dateCreated: new Date(Date.now()),
      forPostId: this.postId,
      createdById: this.accountService.currentUserSource.value.id
    };

    this.commentariesService.createCommentaryForPost(createCommentaryFormValue).subscribe({
      next: () => {
        this.createCommentaryForm.reset();
        this.snackBar.open('Commentary has been created!');
        this.commentaryCreated.emit();
      },
      error: () => this.snackBar.open('Something went wrong!'),
    });
  }
}
