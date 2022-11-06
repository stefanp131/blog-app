import { Component, Input, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { CommentariesSpecParams } from 'src/app/_models/commentariesSpecParams';
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
  pageIndex = 1;
  pageSize = 3;

  constructor(
    private commentariesService: CommentariesService,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getCommentariesPerPostList();
  }

  public getCommentariesPerPostList() {
    const params: CommentariesSpecParams = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      sort: 'dateCreatedAsc',
      search: '',
      postId: this.postId
    }

    this.commentaries$ = this.commentariesService
      .getCommentaries(params)
      .pipe(
        map((list) => {
          if (!this.accountService.currentUserSource.value?.roles.includes('Admin')) {
            return list.filter((com) => com.approved);
          }

          return list;
        })
      );
  }
}
