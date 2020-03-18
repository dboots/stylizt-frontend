import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StylistPortfolioV2PageComponent } from '../../components/portfolio/v2/portfolio.component';

const routes: Routes = [{
    path: 'portfolio/:id',
    component: StylistPortfolioV2PageComponent,
    data: {
      navItems: [
        { name: 'About', url: '#about', scroll: true },
        { name: 'Portfolio', url: '#portfolio', scroll: true },
        { name: 'Login' }
      ]
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
