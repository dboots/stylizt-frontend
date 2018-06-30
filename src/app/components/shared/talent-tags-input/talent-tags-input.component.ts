import { Component, OnInit, Input } from '@angular/core';
import { TalentService } from '../../../services';
import { Talent } from '../../../models/talent.model';

@Component({
  selector: 'app-talent-tags-input',
  templateUrl: './talent-tags-input.component.html',
  styleUrls: ['./talent-tags-input.component.scss']
})
export class TalentTagsInputComponent implements OnInit {
  itemList: Talent[] = [];
  @Input() talents: Talent[] = [];
  selectedItems: Talent[] = [];
  settings = {};
  
  constructor(
    private talentService: TalentService
  ) { }
  
  ngOnInit() {
    this.settings = {
      text: 'YOUR TALENTS...',
      classes: 'myclass custom-class',
      primaryKey: '_id',
      labelKey: 'talent',
      enableSearchFilter: true,
      enableCheckAll: false
      // noDataLabel: 'Search for talent to add...',
      // searchBy: ['name']
    };
    
    this.itemList = [];
    // this.talentService.read(this.authService.token) // The actual api which should be replaced later
    this.talentService.read().subscribe((res: any) => {
      this.itemList = res.data;

      this.selectedItems = this.itemList.filter((talent: any) => {
        let idx = getTalentIndex(talent, this.talents);
        return (idx != -1);
      });

    }, (err) => {
      
    });
  }
  
  onItemSelect(item: any) {
    this.talents.push(item._id);
  }
  
  onItemDeSelect(item: any) {
    let idx = getTalentIndex(item as Talent, this.talents);
    this.talents.splice(idx, 1);
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

function getTalentIndex(needle: Talent, haystack: Talent[]): number {
  return haystack.findIndex((t: Talent) => {
    return (t._id == needle._id);
  });
}
