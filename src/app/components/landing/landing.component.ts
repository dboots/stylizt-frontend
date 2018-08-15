import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingPageComponent {
  private params = null;

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.params = params
      this.updateMeta();
    });
  }

  updateMeta() {
    let location = this.params.city + ', ' + this.params.state;
    this.title.setTitle('Talented stylists near ' + location);
    this.meta.updateTag({
      name: 'description',
      content: 'Stylists near me in ' + location
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'home mortgage loans,mortgages,mortgage loan,mortgage loans,home mortgage'
    });
  }
}
