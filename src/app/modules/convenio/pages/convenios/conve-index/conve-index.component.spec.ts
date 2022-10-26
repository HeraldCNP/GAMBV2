import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveIndexComponent } from './conve-index.component';

describe('ConveIndexComponent', () => {
  let component: ConveIndexComponent;
  let fixture: ComponentFixture<ConveIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConveIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
