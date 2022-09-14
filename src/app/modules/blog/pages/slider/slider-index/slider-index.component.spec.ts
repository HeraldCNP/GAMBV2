import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderIndexComponent } from './slider-index.component';

describe('SliderIndexComponent', () => {
  let component: SliderIndexComponent;
  let fixture: ComponentFixture<SliderIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
