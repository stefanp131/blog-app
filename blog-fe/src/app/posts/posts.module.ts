import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list/posts-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { CreateEditPostComponent } from './create-edit-post/create-edit-post.component';
import { NgMaterialModule } from '../ng-material/ng-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
  },
];

@NgModule({
  declarations: [PostsListComponent, PostComponent, CreateEditPostComponent],
  imports: [CommonModule, NgMaterialModule, FlexLayoutModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsModule {}
