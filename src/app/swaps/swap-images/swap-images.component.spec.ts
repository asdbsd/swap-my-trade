import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapImagesComponent } from './swap-images.component';

describe('SwapImagesComponent', () => {
  let component: SwapImagesComponent;
  let fixture: ComponentFixture<SwapImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
