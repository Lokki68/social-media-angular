import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import {PostsService} from "./services/posts.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
  ],
  providers: [
    PostsService
  ]
})
export class SocialMediaModule { }
