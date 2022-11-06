import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentariesService } from '../posts/commentaries/commentaries-service/commentaries.service';
import { CommentariesSpecParams } from '../_models/commentariesSpecParams';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  selectedFile: any = null;
  imageSrc;
  commentaries;
  disableScroll;

  pageIndex = 1;
  pageSize = 3;

  constructor(
    public accountService: AccountService,
    private commentariesService: CommentariesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCommentaries();

    this.getProfilePicture();
  }

  private getProfilePicture() {
    this.accountService
      .getProfilePicture(this.accountService.currentUserSource.value.id)
      .subscribe((profilePic) => {
        this.imageSrc =
          profilePic['profilePicture'] ?? '../../assets/empty-profile-pic.png';
      });
  }

  private getCommentaries(pageIndex?: number) {
    const params: CommentariesSpecParams = {
      pageIndex: pageIndex ?? this.pageIndex,
      pageSize: this.pageSize,
      sort: 'dateCreatedAsc',
      search: '',
      userId: this.accountService.currentUserSource.value.id,
      approved: true,
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
    this.getCommentaries(this.pageIndex);
  }

  identify(index, item){
    return item.id; 
 }

  updateProfilePicture() {
    this.accountService
      .updateProfilePicture(
        this.accountService.currentUserSource.value.id,
        this.imageSrc
      )
      .subscribe({
        next: () => {
          this.snackBar.open('Profile picture has been updated!', 'Dismiss', {
            duration: 5000,
          });
        },
        error: () => {
          this.snackBar.open('Something went wrong!', 'Dismiss', {
            duration: 5000,
          });
        },
      });
  }

  async onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
    const base64 = await this.convertBase64(this.selectedFile);
    this.imageSrc = base64;
  }

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
}
