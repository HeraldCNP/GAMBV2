import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiUpdateComponent } from './enti-update.component';

describe('EntiUpdateComponent', () => {
  let component: EntiUpdateComponent;
  let fixture: ComponentFixture<EntiUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntiUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntiUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
