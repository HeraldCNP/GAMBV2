import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresoIndexComponent } from './egreso-index.component';

describe('EgresoIndexComponent', () => {
  let component: EgresoIndexComponent;
  let fixture: ComponentFixture<EgresoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgresoIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EgresoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
