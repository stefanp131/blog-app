import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Commentary } from 'src/app/_models/commentary';
import { UpdateCommentary } from 'src/app/_models/updateCommentary';
import { CommentariesService } from '../commentaries-service/commentaries.service';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.scss'],
})
export class CommentaryComponent implements OnInit {
  @Input() commentary: Commentary;
  @Output() commentaryDeleted = new EventEmitter();
  @Output() commentaryUpdated = new EventEmitter();

  commentaryEditForm: FormGroup;
  showForm = false;

  constructor(
    private commentariesService: CommentariesService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  initEditForm() {
    this.showForm = true;
    this.commentaryEditForm = this.formBuilder.group({
      title: [this.commentary.title, Validators.required],
      content: [this.commentary.content, Validators.required],
    });
  }

  delete() {
    this.commentariesService
      .deleteCommentaryById(this.commentary.id)
      .subscribe({
        next: () => {
          this.commentaryDeleted.emit();
          this.snackBar.open('Commentary has been deleted', 'Dismiss', {
            duration: 5000,
          });
        },
        error: () => {
          this.snackBar.open('Something went wrong', 'Dismiss', {
            duration: 5000,
          });
        },
      });
  }

  toggleApprove() {
    this.commentariesService
      .approveCommentaryForPost(this.commentary.id, {
        approved: !this.commentary.approved,
      })
      .subscribe({
        next: () => {
          this.commentary.approved = !this.commentary.approved;
          this.snackBar.open('Commentary has been approved', 'Dismiss', {
            duration: 5000,
          });
        },
        error: () => {
          this.snackBar.open('Something went wrong', 'Dismiss', {
            duration: 5000,
          });
        },
      });
  }

  submit() {
    const editCommentaryFormValue: UpdateCommentary = {
      ...this.commentaryEditForm.value,
    };

    this.commentariesService
      .updateCommentaryForPost(this.commentary.id, editCommentaryFormValue)
      .subscribe({
        next: () => {
          this.commentaryEditForm.reset();
          this.showForm = false;
          this.snackBar.open('Commentary has been created!', 'Dismiss', {
            duration: 5000,
          });
          this.commentaryUpdated.emit();
        },
        error: () =>
          this.snackBar.open('Something went wrong!', 'Dismiss', {
            duration: 5000,
          }),
      });
  }

  cancelForm() {
    this.showForm = false;
    this.commentaryEditForm.reset();
  }
}
