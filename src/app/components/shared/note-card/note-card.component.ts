import { Component, OnInit, Input } from '@angular/core';
import { Notes } from '../../../models';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input() note: Notes;

  constructor() { }

  ngOnInit() {
  }

}
