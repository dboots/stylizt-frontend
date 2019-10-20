import { NgModule, } from '@angular/core';
import { NavComponent } from '../../components/shared/nav/nav.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { SlickModule } from 'ngx-slick';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SlickModule,
    ScrollToModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    SlickModule
  ]
})

export class LayoutDefaultModule { }
