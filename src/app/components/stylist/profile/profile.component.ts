import { Component, OnInit } from '@angular/core';
import { User, Talent } from '../../../models';
import { AuthService, UserService, TalentService } from '../../../services';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-stylistprofile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class StylistProfilePageComponent implements OnInit {
  user: User;
  responses: any[];
  status: string;
  talents: Talent[] = [];
  modalRef: NgbModalRef;
  talentForm: FormGroup;
  talent: FormControl;
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private modalService: NgbModal,
    private talentService: TalentService
  ) {
    this.responses = [];
  }
  
  ngOnInit() {
    this.talent = new FormControl('', [Validators.required]),
    
    this.talentForm = new FormGroup({
      talent: this.talent
    });
    
    this.user = this.authService.decode();
    this.talents = this.user.talents;
  }

  scrollToTalents() {
    try {
      document.querySelector('#talents').scrollIntoView();
    } catch(e) {
      console.log(e);
    }
  }
  
  profileImageUploadCompleted(response) {
    this.user.image = 'http://res.cloudinary.com/drcvakvh3/image/upload/w_400/' + response['public_id'] + '.jpg';
  }
  
  uploadAndUpdate() {
    this.user.talents = this.talents;
    this.update();
  }
  
  update() {
    this.userService.update(this.authService.token, this.user).subscribe((result: any) => {
      this.authService.token = result.token;
      this.status = 'Profile updated!';
    }, (err) => {
      console.log('Error while updating user', err);
    });
  }
  
  modal(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
  
  addTalent() {
    let talent: Talent = new Talent(this.talent.value);
    this.talentService.create(talent).subscribe((result: any) => {
      this.modalRef.close();
      this.talentService.itemList.push(result.result);
    }, (err) => {
    });
  }
  
}
