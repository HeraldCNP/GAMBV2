import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosIndexComponent } from './prestamos-index.component';

describe('PrestamosIndexComponent', () => {
  let component: PrestamosIndexComponent;
  let fixture: ComponentFixture<PrestamosIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamosIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
