import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeTransfeComponent } from './see-transfe.component';

describe('SeeTransfeComponent', () => {
  let component: SeeTransfeComponent;
  let fixture: ComponentFixture<SeeTransfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeTransfeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeTransfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
