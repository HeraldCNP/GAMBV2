import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizacionCreateComponent } from './amortizacion-create.component';

describe('AmortizacionCreateComponent', () => {
  let component: AmortizacionCreateComponent;
  let fixture: ComponentFixture<AmortizacionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmortizacionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmortizacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
