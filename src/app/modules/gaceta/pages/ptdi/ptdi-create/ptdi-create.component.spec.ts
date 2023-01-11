import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtdiCreateComponent } from './ptdi-create.component';

describe('PtdiCreateComponent', () => {
  let component: PtdiCreateComponent;
  let fixture: ComponentFixture<PtdiCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtdiCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtdiCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
