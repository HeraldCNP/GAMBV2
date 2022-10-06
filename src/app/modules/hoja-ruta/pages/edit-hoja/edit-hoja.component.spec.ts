import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHojaComponent } from './edit-hoja.component';

describe('EditHojaComponent', () => {
  let component: EditHojaComponent;
  let fixture: ComponentFixture<EditHojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHojaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
