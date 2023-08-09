import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanCreateComponent } from './finan-create.component';

describe('FinanCreateComponent', () => {
  let component: FinanCreateComponent;
  let fixture: ComponentFixture<FinanCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
