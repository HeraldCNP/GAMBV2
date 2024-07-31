import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeLubriComponent } from './vale-lubri.component';

describe('ValeLubriComponent', () => {
  let component: ValeLubriComponent;
  let fixture: ComponentFixture<ValeLubriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValeLubriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValeLubriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
