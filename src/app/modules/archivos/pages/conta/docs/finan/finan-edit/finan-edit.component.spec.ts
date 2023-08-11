import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanEditComponent } from './finan-edit.component';

describe('FinanEditComponent', () => {
  let component: FinanEditComponent;
  let fixture: ComponentFixture<FinanEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
