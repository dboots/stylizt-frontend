import { Component, ViewContainerRef, ViewChild, OnInit, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { EditProfileDetailsComponent } from './details/details.component';
import { AuthService, UserService } from '../../../../services';
import { User } from '../../../../models';
import { FormGroup, FormControl } from '@angular/forms';
import { EditProfilePortfolioComponent } from './portfolio/portfolio.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('componentLoader', { read: ViewContainerRef, static: true }) componentLoader: ViewContainerRef;

  components: any[] = [
    { details: EditProfileDetailsComponent },
    { portfolio: EditProfilePortfolioComponent }
  ];

  user: User;
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private authService: AuthService,
    private userService: UserService
  ) {
    let user: User = new User();
    let formGroup = this.formGroup;
    user = Object.assign(user, this.authService.decode());

    Object.keys(user).map((key) => {
      formGroup.addControl(key, new FormControl());
    });

    formGroup.patchValue(user);

    this.user = user;
    this.formGroup = formGroup;
  }

  ngOnInit() {
    this.loadComponent('details');
  }

  loadComponent(componentId: string) {
    let component = this.components.filter((item) => {
      return Object.keys(item).filter((key) => key === componentId).length > 0;
    })[0][componentId];
    let factory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(component);

    this.componentLoader.clear();

    let instance: ComponentRef<any> = this.componentLoader.createComponent(factory);
    instance.instance.user = this.user;
  }

  save() {
    const source: User = this.user;
    let user: User = this.formGroup.value;

    user.brands = source.brands;
    user.talents = source.talents;

    this.userService.update(user).subscribe((result) => {
      this.authService.token = result.token;
    });
  }
}
