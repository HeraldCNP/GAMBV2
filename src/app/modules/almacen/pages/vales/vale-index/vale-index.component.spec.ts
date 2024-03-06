import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeIndexComponent } from './vale-index.component';

describe('ValeIndexComponent', () => {
  let component: ValeIndexComponent;
  let fixture: ComponentFixture<ValeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
