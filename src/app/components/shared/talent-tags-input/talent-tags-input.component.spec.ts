import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentTagsInputComponent } from './talent-tags-input.component';

describe('TalentTagsInputComponent', () => {
  let component: TalentTagsInputComponent;
  let fixture: ComponentFixture<TalentTagsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentTagsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentTagsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
