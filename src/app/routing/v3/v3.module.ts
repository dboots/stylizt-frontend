import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../components/shared/shared.module';
import { Version3RoutingModule } from './v3.routing.module';

@NgModule({
  imports: [
    CommonModule,
    Version3RoutingModule
  ],
  declarations: [
  ],
  exports: [
    SharedModule
  ]
})
export class Version3Module { }
