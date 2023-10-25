import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresoUpdateComponent } from './egreso-update.component';

describe('EgresoUpdateComponent', () => {
  let component: EgresoUpdateComponent;
  let fixture: ComponentFixture<EgresoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgresoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EgresoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
