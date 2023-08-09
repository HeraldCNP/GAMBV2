import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SipCreateComponent } from './sip-create.component';

describe('SipCreateComponent', () => {
  let component: SipCreateComponent;
  let fixture: ComponentFixture<SipCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SipCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SipCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
