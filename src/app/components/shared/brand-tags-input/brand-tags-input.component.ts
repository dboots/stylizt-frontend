import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BrandService } from '../../../services';
import { Brand } from '../../../models/brand.model';

@Component({
  selector: 'app-brand-tags-input',
  templateUrl: './brand-tags-input.component.html',
  styleUrls: ['./brand-tags-input.component.scss']
})
export class BrandagsInputComponent implements OnInit {
  itemList: Brand[]; // TODO: PARAM (type)
  @Input() items: Brand[] = []; // TODO: PARAM (type)
  @Input() selectedItems: Brand[] = []; // TODO: PARAM (type)
  @Output() selectedItemsChange: EventEmitter<Brand[]> = new EventEmitter();
  settings = {};

  constructor(private brandService: BrandService) {}

  async ngOnInit() {
    this.settings = {
      text: 'SELECT BRANDS...',
      classes: 'myclass custom-class',
      primaryKey: '_id',
      labelKey: 'brand', // TODO: PARAM
      enableSearchFilter: true,
      enableCheckAll: false
      // noDataLabel: 'Search for brand to add...',
      // searchBy: ['name']
    };

    this.itemList = [];
    try {
      this.itemList = await this.brandService.read();

      this.selectedItems = this.itemList.filter((brand: any) => {
        const idx = getBrandIndex(brand, this.items);
        return idx !== -1;
      });
      this.selectedItemsChange.emit(this.selectedItems);
    } catch (e) {
      console.log('exception', e);
    }
  }

  onItemSelect(item: any) {
    this.items.push(item._id);
  }

  onItemDeSelect(item: any) {
    const idx = getBrandIndex(item as Brand, this.items);
    this.items.splice(idx, 1);
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

function getBrandIndex(needle: Brand, haystack: Brand[]): number {
  return haystack.findIndex((t: Brand) => {
    return t._id === needle._id;
  });
}
