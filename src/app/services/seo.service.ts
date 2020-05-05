import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SeoService {
  constructor(private meta: Meta, private title: Title, @Inject(DOCUMENT) private dom) {
    this.meta.updateTag({
      name: 'author',
      content: 'Hair to Chair'
    });

    this.meta.updateTag({
      name: 'publisher',
      content: 'Hair to Chair'
    });

    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow (same for all)'
    });
  }

  addMetaTag(name: string, content: string) {
    this.meta.addTag({name, content}, true);
  }

  updateMetaTags(title: string, metaTitle: string, metaDescription: string) {
    metaTitle = metaTitle || title;

    this.title.setTitle(title);

    this.meta.updateTag({
      name: 'title',
      content: metaTitle
    });

    this.meta.updateTag({
      name: 'description',
      content: metaDescription
    });
  }

  createCanonicalUrl() {
    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', this.dom.URL);
  }
}
