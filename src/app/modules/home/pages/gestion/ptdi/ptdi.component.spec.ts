import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtdiComponent } from './ptdi.component';

describe('PtdiComponent', () => {
  let component: PtdiComponent;
  let fixture: ComponentFixture<PtdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtdiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
