import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoEvaluacionComponent } from './seguimiento-evaluacion.component';

describe('SeguimientoEvaluacionComponent', () => {
  let component: SeguimientoEvaluacionComponent;
  let fixture: ComponentFixture<SeguimientoEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoEvaluacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientoEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
