import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeiIndexComponent } from './pei-index.component';

describe('PeiIndexComponent', () => {
  let component: PeiIndexComponent;
  let fixture: ComponentFixture<PeiIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeiIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeiIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
