import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTradeComponent } from './offer-trade.component';

describe('OfferTradeComponent', () => {
  let component: OfferTradeComponent;
  let fixture: ComponentFixture<OfferTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferTradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
