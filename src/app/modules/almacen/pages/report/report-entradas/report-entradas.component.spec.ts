import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEntradasComponent } from './report-entradas.component';

describe('ReportEntradasComponent', () => {
  let component: ReportEntradasComponent;
  let fixture: ComponentFixture<ReportEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEntradasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
