import { NgModule } from '@angular/core';
import { PostsListComponent } from './posts-list/posts-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { CreateEditPostComponent } from './create-edit-post/create-edit-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { CommentaryListComponent } from './commentaries/commentary-list/commentary-list.component';
import { CommentaryComponent } from './commentaries/commentary/commentary.component';
import { CreateCommentaryComponent } from './commentaries/create-commentary/create-commentary.component';
import { UtcDateToLocalPipe } from '../_pipes/utcToLocal.pipe';
import { SharedModule } from '../_modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
  },
  {
    path: ':id/details',
    component: PostDetailsComponent,
  },
  {
    path: ':id',
    component: CreateEditPostComponent,
  },
];

@NgModule({
  declarations: [
    PostsListComponent,
    PostComponent,
    CreateEditPostComponent,
    PostDetailsComponent,
    CommentaryListComponent,
    CommentaryComponent,
    CreateCommentaryComponent,
    
  ],
  imports: [
    SharedModule,    
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PostsModule {}
