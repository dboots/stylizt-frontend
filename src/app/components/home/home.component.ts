import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  track(event) {
    console.log('Scroll Event', window.pageYOffset);
  }
}
