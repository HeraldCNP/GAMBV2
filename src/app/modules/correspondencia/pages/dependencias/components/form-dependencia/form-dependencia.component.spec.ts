import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDependenciaComponent } from './form-dependencia.component';

describe('FormDependenciaComponent', () => {
  let component: FormDependenciaComponent;
  let fixture: ComponentFixture<FormDependenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDependenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDependenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
