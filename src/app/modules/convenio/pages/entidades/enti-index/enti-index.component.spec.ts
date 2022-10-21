import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiIndexComponent } from './enti-index.component';

describe('EntiIndexComponent', () => {
  let component: EntiIndexComponent;
  let fixture: ComponentFixture<EntiIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntiIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntiIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
