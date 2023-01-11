import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtdiIndexComponent } from './ptdi-index.component';

describe('PtdiIndexComponent', () => {
  let component: PtdiIndexComponent;
  let fixture: ComponentFixture<PtdiIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtdiIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtdiIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
