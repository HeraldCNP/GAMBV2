import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTipoComponent } from './form-tipo.component';

describe('FormTipoComponent', () => {
  let component: FormTipoComponent;
  let fixture: ComponentFixture<FormTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTipoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
