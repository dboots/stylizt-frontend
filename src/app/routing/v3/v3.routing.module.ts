import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from '../../components/home/home.component';
import { BlogPostComponent } from '../../components/blog/post/post.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }, {
    path: 'blog',
    children: [{
      path: 'post/:slug',
      component: BlogPostComponent
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Version3RoutingModule { }
