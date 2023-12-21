import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFisicoValoradoComponent } from './report-fisico-valorado.component';

describe('ReportFisicoValoradoComponent', () => {
  let component: ReportFisicoValoradoComponent;
  let fixture: ComponentFixture<ReportFisicoValoradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportFisicoValoradoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportFisicoValoradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
