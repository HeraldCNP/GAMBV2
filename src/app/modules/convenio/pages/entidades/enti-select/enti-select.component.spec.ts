import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiSelectComponent } from './enti-select.component';

describe('EntiSelectComponent', () => {
  let component: EntiSelectComponent;
  let fixture: ComponentFixture<EntiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntiSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
