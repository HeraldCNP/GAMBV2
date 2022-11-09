import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveUpdateComponent } from './conve-update.component';

describe('ConveUpdateComponent', () => {
  let component: ConveUpdateComponent;
  let fixture: ComponentFixture<ConveUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
