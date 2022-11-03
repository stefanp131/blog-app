import { Component, Input, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Commentary } from 'src/app/_models/commentary';
import { AccountService } from 'src/app/_services/account.service';
import { CommentariesService } from '../commentaries-service/commentaries.service';

@Component({
  selector: 'app-commentary-list',
  templateUrl: './commentary-list.component.html',
  styleUrls: ['./commentary-list.component.scss'],
})
export class CommentaryListComponent implements OnInit {
  @Input() postId: number;
  commentaries$: Observable<Commentary[]>;

  constructor(
    private commentariesService: CommentariesService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getCommentariesPerPostList();
  }

  public getCommentariesPerPostList() {
    this.commentaries$ = this.commentariesService
      .getCommentariesPerPost(this.postId)
      .pipe(
        map((list) => {
          if (!this.accountService.currentUserSource.value.roles.includes('Admin')) {
            return list.filter((com) => com.approved);
          }

          return list;
        })
      );
  }
}
