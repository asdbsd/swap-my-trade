import { TestBed } from '@angular/core/testing';

import { SwapService } from './swap.service';

describe('SwapService', () => {
  let service: SwapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
