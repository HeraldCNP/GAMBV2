import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIndexComponent } from './report-index.component';

describe('ReportIndexComponent', () => {
  let component: ReportIndexComponent;
  let fixture: ComponentFixture<ReportIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
