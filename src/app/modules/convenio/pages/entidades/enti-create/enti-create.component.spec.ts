import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiCreateComponent } from './enti-create.component';

describe('EntiCreateComponent', () => {
  let component: EntiCreateComponent;
  let fixture: ComponentFixture<EntiCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntiCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntiCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
