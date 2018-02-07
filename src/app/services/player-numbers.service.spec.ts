import { TestBed, inject } from '@angular/core/testing';

import { PlayerNumberService } from './player-numbers.service';

describe('PlayerNumberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerNumberService]
    });
  });

  it('should be created', inject([PlayerNumberService], (service: PlayerNumberService) => {
    expect(service).toBeTruthy();
  }));
});
