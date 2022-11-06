import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxEditorModule } from 'ngx-editor';
import { config } from '../ngx-editor-config/config';
import { UtcDateToLocalPipe } from 'src/app/_pipes/utcToLocal.pipe';



@NgModule({
  declarations: [UtcDateToLocalPipe
    
  ],
  imports: [
    CommonModule,
    CommonModule,
    NgMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxEditorModule.forChild(config),
  ],
  exports: [
    CommonModule,
    CommonModule,
    NgMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxEditorModule,
    UtcDateToLocalPipe
  ]
})
export class SharedModule { }
