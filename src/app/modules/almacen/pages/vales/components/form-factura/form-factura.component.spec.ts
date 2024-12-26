import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFacturaComponent } from './form-factura.component';

describe('FormFacturaComponent', () => {
  let component: FormFacturaComponent;
  let fixture: ComponentFixture<FormFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
