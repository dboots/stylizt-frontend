import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../components/shared/shared.module';
import { Version3RoutingModule } from './v3.routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Version3RoutingModule,
    SharedModule
  ],
  declarations: [],
  exports: [
  ]
})
export class Version3Module { }
