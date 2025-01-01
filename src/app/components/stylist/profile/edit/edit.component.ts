import { Component, ViewContainerRef, ViewChild, OnInit, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { EditProfileDetailsComponent } from './details/details.component';
import { AuthService, UserService } from '../../../../services';
import { User } from '../../../../models';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { EditProfilePortfolioComponent } from './portfolio/portfolio.component';
import { EditProfileServicesComponent } from './services/services.component';
import { EditProfileClientsComponent } from './clients/clients.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('componentLoader', { read: ViewContainerRef, static: true }) componentLoader: ViewContainerRef;

  components: any[] = [
    { details: EditProfileDetailsComponent },
    { portfolio: EditProfilePortfolioComponent },
    { services: EditProfileServicesComponent },
    { clients: EditProfileClientsComponent }
  ];

  user: User;
  formGroup: UntypedFormGroup = new UntypedFormGroup({});
  activeTab: string = 'details';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private authService: AuthService,
    private userService: UserService
  ) {
    let user: User = new User();
    let formGroup = this.formGroup;
    let requiredFields = ['name', 'email', 'zip', 'city', 'state', 'url'];

    user = Object.assign(user, this.authService.decode());

    Object.keys(user).map((key) => {
      let control = new UntypedFormControl();

      if (requiredFields.indexOf(key) !== -1) {
        control.setValidators(Validators.required);
      }

      /* remove phone validation for now
      if (key === 'phone') {
        control.setValidators(this.phoneValidator);
      } */

      formGroup.addControl(key, control);
    });

    formGroup.patchValue(user);

    this.user = user;
    this.formGroup = formGroup;
  }

  ngOnInit() {
    this.loadComponent('details');
  }

  isActive(tab: string) {
    return (tab === this.activeTab);
  }

  loadComponent(componentId: string) {
    let component = this.components.filter((item) => {
      return Object.keys(item).filter((key) => key === componentId).length > 0;
    })[0][componentId];
    let factory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(component);

    this.componentLoader.clear();

    let instance: ComponentRef<any> = this.componentLoader.createComponent(factory);
    instance.instance.user = this.user;
    this.activeTab = componentId;
  }

  /*
  save() {
    const source: User = this.user;
    let user: User = this.formGroup.value;

    this.isSaving = true;

    user.image = source.image;
    user.brands = source.brands;
    user.talents = source.talents;
    user.hours = source.hours;

    console.log(user);

    this.userService.update(user).subscribe((result) => {
      this.authService.token = result.token;
      this.isSaving = false;
    });
  }
  */

  phoneValidator(c: UntypedFormControl) {
    return (/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(c.value)) ? null : {
      validatePhone: {
        valid: false
      }
    };
  }
}
