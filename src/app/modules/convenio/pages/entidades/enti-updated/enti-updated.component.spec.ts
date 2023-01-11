import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiUpdatedComponent } from './enti-updated.component';

describe('EntiUpdatedComponent', () => {
  let component: EntiUpdatedComponent;
  let fixture: ComponentFixture<EntiUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntiUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntiUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
