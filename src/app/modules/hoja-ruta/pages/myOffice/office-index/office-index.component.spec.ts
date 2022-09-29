import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeIndexComponent } from './office-index.component';

describe('OfficeIndexComponent', () => {
  let component: OfficeIndexComponent;
  let fixture: ComponentFixture<OfficeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
