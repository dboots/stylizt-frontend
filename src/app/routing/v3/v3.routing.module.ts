import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from '../../components/home/home.component';
import { BlogPostComponent } from '../../components/blog/post/post.component';
import { EditProfileComponent } from '../../components/stylist/profile/edit/edit.component';
import { BlogTagComponent } from '../../components/blog/tag/tag.component';
import { BlogHomeComponent } from '../../components/blog/blog.component';
import { AuthGuardService } from 'src/app/services';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }, {
    path: 'blog',
    children: [{
      path: '',
      component: BlogHomeComponent
    }, {
      path: 'tag/:slug',
      component: BlogTagComponent
    }, {
      path: ':slug',
      component: BlogPostComponent
    }]
  }, {
    path: 'stylist/profile/edit',
    component: EditProfileComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Version3RoutingModule { }
