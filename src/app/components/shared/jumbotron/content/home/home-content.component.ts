import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home-content',
    templateUrl: './home-content.component.html',
    styleUrls: ['./home-content.component.scss'],
    imports: [RouterLink],
    standalone: true
})
export class HomeContentComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
