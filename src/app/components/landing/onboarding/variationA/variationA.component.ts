import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-variationb',
  templateUrl: './variationA.component.html',
  styleUrls: ['./variationA.component.scss']
})
export class LandingVariationAComponent {
  constructor(
    private meta: Meta,
    private route: ActivatedRoute,
    private title: Title
  ) {
    this.route.params.subscribe((params) => {
      this.updateMeta();
    });
  }

  updateMeta() {
    this.title.setTitle('Affordable & Simple Stylist Appointment Book App');
    this.meta.updateTag({
      name: 'description',
      content: 'Hair to Chair offers affordable and easy to use appointment books and scheduling apps for independant stylists'
    });
  }
}
