import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevenEditComponent } from './deven-edit.component';

describe('DevenEditComponent', () => {
  let component: DevenEditComponent;
  let fixture: ComponentFixture<DevenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevenEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
