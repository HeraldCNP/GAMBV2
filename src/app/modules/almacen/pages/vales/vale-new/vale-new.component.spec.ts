import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeNewComponent } from './vale-new.component';

describe('ValeNewComponent', () => {
  let component: ValeNewComponent;
  let fixture: ComponentFixture<ValeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValeNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
