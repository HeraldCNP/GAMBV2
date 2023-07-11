import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevenCreateComponent } from './deven-create.component';

describe('DevenCreateComponent', () => {
  let component: DevenCreateComponent;
  let fixture: ComponentFixture<DevenCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevenCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevenCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
