import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveTransfeComponent } from './conve-transfe.component';

describe('ConveTransfeComponent', () => {
  let component: ConveTransfeComponent;
  let fixture: ComponentFixture<ConveTransfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveTransfeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConveTransfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
