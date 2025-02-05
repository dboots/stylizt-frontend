import { CommonModule } from "@angular/common";
import { Component, ViewEncapsulation, Input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-blog-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterLink],
  standalone: true,
})
export class BlogPostItemComponent {
  @Input() post: any = {};
}
