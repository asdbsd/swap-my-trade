import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapOwnerComponent } from './swap-owner.component';

describe('SwapOwnerComponent', () => {
  let component: SwapOwnerComponent;
  let fixture: ComponentFixture<SwapOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
