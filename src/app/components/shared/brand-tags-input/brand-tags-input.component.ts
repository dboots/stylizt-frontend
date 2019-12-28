import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { BrandService } from '../../../services';
import { Brand } from '../../../models/brand.model';

@Component({
  selector: 'app-brand-tags-input',
  templateUrl: './brand-tags-input.component.html',
  styleUrls: ['./brand-tags-input.component.scss']
})
export class BrandTagsInputComponent implements OnInit, OnChanges {
  itemList: Brand[]; // TODO: PARAM (type)
  @Input() items: Brand[] = []; // TODO: PARAM (type)
  @Input() selectedItems: Brand[] = []; // TODO: PARAM (type)
  @Output() selectedItemsChange: EventEmitter<Brand[]> = new EventEmitter();
  settings = {};

  constructor(private brandService: BrandService) {}

  async ngOnInit() {
    this.settings = {
      text: 'Search for brand...',
      classes: 'brand-tags-input',
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

  ngOnChanges(changes) {
    console.log(changes);
  }

  onItemSelect(item: any) {
    this.items.push(item._id);
  }

  onItemDeSelect(item: any) {
    const idx = getBrandIndex(item as Brand, this.items);
    this.items.splice(idx, 1);
  }
}

function getBrandIndex(needle: Brand, haystack: Brand[]): number {
  return haystack.findIndex((t: Brand) => {
    return t.brand === needle.brand;
  });
}
