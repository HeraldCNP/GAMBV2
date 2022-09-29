import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerivarSeguimientoComponent } from './derivar-seguimiento.component';

describe('DerivarSeguimientoComponent', () => {
  let component: DerivarSeguimientoComponent;
  let fixture: ComponentFixture<DerivarSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DerivarSeguimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DerivarSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
