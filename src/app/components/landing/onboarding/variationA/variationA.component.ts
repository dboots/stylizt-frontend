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
    this.title.setTitle('The Tools You Need Build Your Stylist Clientele FAST');
    this.meta.updateTag({
      name: 'description',
      content: 'Hair to Chair puts you in front of clients that are interested in your talents FAST.'
    });
  }
}
