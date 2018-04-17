import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  constructor(private modalService: NgbModal) { }
  
  ngOnInit() {
  }
  
  modal(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }
  
}
