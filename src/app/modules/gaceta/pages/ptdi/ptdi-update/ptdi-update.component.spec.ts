import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtdiUpdateComponent } from './ptdi-update.component';

describe('PtdiUpdateComponent', () => {
  let component: PtdiUpdateComponent;
  let fixture: ComponentFixture<PtdiUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtdiUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtdiUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
