import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SipListComponent } from './sip-list.component';

describe('SipListComponent', () => {
  let component: SipListComponent;
  let fixture: ComponentFixture<SipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SipListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
