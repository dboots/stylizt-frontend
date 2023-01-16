import { NgModule } from '@angular/core';
import { BrandTagsInputComponent } from './brand-tags-input/brand-tags-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryUploaderComponent } from './cloudinary-uploader/cloudinary-uploader.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { TryNowComponent } from './try-now/try-now.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { HomeContentComponent } from './jumbotron/content/home/home-content.component';
import { StylistsNearMeContentComponent } from './jumbotron/content/stylists-near-me/content';
import { DirectoryComponent } from './directory/directory.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FileUploadModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: 'your_cloud_name'
    } as CloudinaryConfiguration),
  ],
  declarations: [
    BrandTagsInputComponent,
    CloudinaryUploaderComponent,
    NavComponent,
    TryNowComponent,
    SchedulerComponent,
    FooterComponent,
    JumbotronComponent,
    HomeContentComponent,
    StylistsNearMeContentComponent,
    DirectoryComponent
  ],
  exports: [
    BrandTagsInputComponent,
    CloudinaryUploaderComponent,
    NavComponent,
    TryNowComponent,
    SchedulerComponent,
    FooterComponent,
    JumbotronComponent,
    HomeContentComponent,
    StylistsNearMeContentComponent,
    DirectoryComponent,
  ]
})
export class SharedModule { }
