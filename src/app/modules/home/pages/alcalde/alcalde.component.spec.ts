import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcaldeComponent } from './alcalde.component';

describe('AlcaldeComponent', () => {
  let component: AlcaldeComponent;
  let fixture: ComponentFixture<AlcaldeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlcaldeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlcaldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
