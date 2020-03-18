import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../components/shared/shared.module';
import { PortfolioRoutingModule } from './portfolio.routing.module';

@NgModule({
  imports: [
    CommonModule,
    PortfolioRoutingModule
  ],
  declarations: [
  ],
  exports: [
    SharedModule
  ]
})
export class PortfolioModule { }
