import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import {MaterialModule} from "./material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ShortenPipe} from "./pipes/shorten.pipe";
import {CompletNamePipe} from "./pipes/completName.pipe";
import {TimeAgoPipe} from "./pipes/time-ago.pipe";
import {HighlightDirective} from "./directives/highlight.directive";



@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    CompletNamePipe,
    TimeAgoPipe,
    HighlightDirective

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    CommentsComponent,
    ReactiveFormsModule,
    ShortenPipe,
    CompletNamePipe,
    TimeAgoPipe,
    HighlightDirective
  ]
})
export class SharedModule { }
