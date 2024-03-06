import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeUpdateComponent } from './vale-update.component';

describe('ValeUpdateComponent', () => {
  let component: ValeUpdateComponent;
  let fixture: ComponentFixture<ValeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValeUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
