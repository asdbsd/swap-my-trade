import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapTradesComponent } from './swap-trades.component';

describe('SwapDetailsTradesComponent', () => {
  let component: SwapTradesComponent;
  let fixture: ComponentFixture<SwapTradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapTradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
