import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapDetailsComponent } from './swap-details.component';

describe('SwapDetailsComponent', () => {
  let component: SwapDetailsComponent;
  let fixture: ComponentFixture<SwapDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
