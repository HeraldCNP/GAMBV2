import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCorrespondenciaComponent } from './form-correspondencia.component';

describe('FormCorrespondenciaComponent', () => {
  let component: FormCorrespondenciaComponent;
  let fixture: ComponentFixture<FormCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
