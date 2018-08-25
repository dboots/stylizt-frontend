import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-video',
  templateUrl: './video.component.html'
})
export class LandingVideoPageComponent {
  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ) {
    this.updateMeta();
  }

  updateMeta() {
    this.title.setTitle('Hair to Chair - Personal Stylists, Video Consultations');
    
    this.meta.updateTag({
      name: 'description',
      content: 'Live 1 on 1 video chat and consultations with you personal stylist specializing in haircuts, perms, bangs.'
    });

    console.log('PRErender ready status...');
  }
}
