import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService, TalentService } from '../../../services';

@Component({
  selector: 'app-talent-tags-input',
  templateUrl: './talent-tags-input.component.html',
  styleUrls: ['./talent-tags-input.component.scss']
})
export class TalentTagsInputComponent implements OnInit {
  itemList: any = [];
  selectedItems = [];
  settings = {};

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private talentService: TalentService
  ) { }

  ngOnInit() {
    this.settings = {
      text: 'Search for talent to add...',
      classes: 'myclass custom-class',
      primaryKey: 'id',
      labelKey: 'name',
      enableSearchFilter: true,
      enableCheckAll: false
      // noDataLabel: 'Search for talent to add...',
      // searchBy: ['name']
    };

    this.itemList = [];
    // this.talentService.read(this.authService.token) // The actual api which should be replaced later
    this.talentService.readMockData()
      .subscribe((res: any) => {
        this.itemList = res;
      }, (err) => {

      });
  }

  onItemSelect(item: any) {
      console.log(item);
      console.log(this.selectedItems);
  }

  OnItemDeSelect(item: any) {
      console.log(item);
      console.log(this.selectedItems);
  }

  onSearch(evt: any) {
    // console.log(evt.target.value);
    // this.http.get('https://restcountries.eu/rest/v2/name/'+evt.target.value+'?fulltext=true')
    //     .subscribe((res) => {
    //         console.log(res);
    //         this.itemList = res;
    //     }, (error) => {

    //     });
  }
}
