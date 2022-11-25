import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensoriaComponent } from './defensoria.component';

describe('DefensoriaComponent', () => {
  let component: DefensoriaComponent;
  let fixture: ComponentFixture<DefensoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefensoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefensoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
