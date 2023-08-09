import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SipEditComponent } from './sip-edit.component';

describe('SipEditComponent', () => {
  let component: SipEditComponent;
  let fixture: ComponentFixture<SipEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SipEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SipEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
