import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeiComponent } from './pei.component';

describe('PeiComponent', () => {
  let component: PeiComponent;
  let fixture: ComponentFixture<PeiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
