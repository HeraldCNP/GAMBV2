import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportValesComponent } from './report-vales.component';

describe('ReportValesComponent', () => {
  let component: ReportValesComponent;
  let fixture: ComponentFixture<ReportValesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportValesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportValesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
