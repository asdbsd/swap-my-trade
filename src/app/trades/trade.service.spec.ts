import { TestBed } from '@angular/core/testing';
import { TradeService } from './trade.service';

describe('TradesService', () => {
  let service: TradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
