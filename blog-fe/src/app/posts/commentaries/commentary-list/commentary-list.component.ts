import { Component, Input, OnInit } from '@angular/core';
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
  commentaries: Commentary[];
  pageIndex = 1;
  pageSize = 5;
  disableScroll: boolean;

  constructor(
    private commentariesService: CommentariesService,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getCommentariesPerPostList();
  }

  public getCommentariesPerPostList(pageIndex?: number) {
    const params: CommentariesSpecParams = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      sort: 'dateCreatedAsc',
      search: '',
      postId: this.postId,
      approved: !this.accountService.currentUserSource.value?.roles.includes('Admin')
    };

    this.commentariesService
      .getCommentaries(params)
      .subscribe((commentaries) => {
        if (pageIndex) {
          if (commentaries['data'].length === 0) {
            this.disableScroll = true;
          } else {
            this.commentaries.push(...commentaries['data']);
          }
        } else this.commentaries = commentaries['data'];
      });
  }
  onScroll() {
    this.pageIndex++;
    this.getCommentariesPerPostList(this.pageIndex);
  }

  resetIndex() {
    this.disableScroll = false;
    this.pageIndex = 1;
  }

  identify(index, item) {
    return item.id;
  }
}
