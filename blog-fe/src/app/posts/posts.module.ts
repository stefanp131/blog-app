import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list/posts-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { CreateEditPostComponent } from './create-edit-post/create-edit-post.component';
import { NgMaterialModule } from '../ng-material/ng-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { PostDetailsComponent } from './post-details/post-details.component';
import { NgxEditorModule } from 'ngx-editor';
import { config } from './ngx-editor-config/config';
import { CommentaryListComponent } from './commentaries/commentary-list/commentary-list.component';
import { CommentaryComponent } from './commentaries/commentary/commentary.component';
import { CreateCommentaryComponent } from './commentaries/create-commentary/create-commentary.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
    CommonModule,
    NgMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxEditorModule.forChild(config),
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PostsModule {}
