import { TestBed, inject } from '@angular/core/testing';

import { TalentService } from './talent.service';

describe('TalentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TalentService]
    });
  });

  it('should be created', inject([TalentService], (service: TalentService) => {
    expect(service).toBeTruthy();
  }));
});
