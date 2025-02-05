import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    imports: [CommonModule],
    standalone: true
})
export class LoadingComponent implements OnInit {
  @Input() progress;

  constructor() { }

  ngOnInit() {
  }

}
