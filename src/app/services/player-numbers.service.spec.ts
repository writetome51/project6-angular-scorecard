import { TestBed, inject } from '@angular/core/testing';

import { PlayerNumbersService } from './player-numbers.service';

describe('PlayerNumbersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerNumbersService]
    });
  });

  it('should be created', inject([PlayerNumbersService], (service: PlayerNumbersService) => {
    expect(service).toBeTruthy();
  }));
});
