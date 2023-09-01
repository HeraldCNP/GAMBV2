import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportArticulosComponent } from './report-articulos.component';

describe('ReportArticulosComponent', () => {
  let component: ReportArticulosComponent;
  let fixture: ComponentFixture<ReportArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
