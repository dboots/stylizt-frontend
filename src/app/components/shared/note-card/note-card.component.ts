import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-note-card',
    templateUrl: './note-card.component.html',
    styleUrls: ['./note-card.component.scss'],
    imports: [CommonModule],
    standalone: true
})
export class NoteCardComponent implements OnInit {
  @Input() note: Note;

  constructor() { }

  ngOnInit() {
  }

}
