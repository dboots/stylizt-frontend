import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post } from '../models';

@Injectable()
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  getBlogs() {
    const url = 'https://blog.hairtochair.com/wp-json/wp/v2/posts?_embed&per_page=4';
    return this.http.get<any[]>(url).map((res): Post[] => res.map((item): Post => new Post(
      item.title.rendered,
      item.excerpt.rendered,
      new Date(item.date),
      (item._embedded['wp:featuredmedia']) ? item._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url : '',
      item.link
      ))
    );
  }
}
