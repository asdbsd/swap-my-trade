import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySwapsComponent } from './my-swaps.component';

describe('MySwapsComponent', () => {
  let component: MySwapsComponent;
  let fixture: ComponentFixture<MySwapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySwapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySwapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
