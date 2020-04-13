import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared/shared.module';

@NgModule({
  declarations: [ ],
  imports: [
    RouterModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ScrollToModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ]
})

export class LayoutDefaultModule { }
