import { TestBed } from '@angular/core/testing';

import { TattooistService } from './tattooist.service';

describe('TattooistService', () => {
  let service: TattooistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TattooistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
