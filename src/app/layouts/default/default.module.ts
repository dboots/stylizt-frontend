import { NgModule, } from '@angular/core';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { SlickModule } from 'ngx-slick';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared/shared.module';

@NgModule({
  declarations: [ ],
  imports: [
    RouterModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    SlickModule,
    ScrollToModule,
    SharedModule
  ],
  exports: [
    SlickModule,
    SharedModule
  ]
})

export class LayoutDefaultModule { }
