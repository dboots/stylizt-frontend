import { NgModule } from '@angular/core';
import { BrandTagsInputComponent } from './brand-tags-input/brand-tags-input.component';
import { CommonModule } from '@angular/common';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/multiselect.component';
import { FormsModule } from '@angular/forms';
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryUploaderComponent } from './cloudinary-uploader/cloudinary-uploader.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    AngularMultiSelectModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: 'your_cloud_name'
    } as CloudinaryConfiguration),
  ],
  declarations: [
    BrandTagsInputComponent,
    CloudinaryUploaderComponent,
  ],
  exports: [
    BrandTagsInputComponent,
    CloudinaryUploaderComponent
  ]
})
export class SharedModule { }
