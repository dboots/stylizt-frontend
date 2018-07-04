import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {
  @Input() dropdownOptions: any[];
  @Input() currentOption;
  @Output() onselect: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectDropdown(option: any) {
    this.onselect.emit(option);
  }
}
