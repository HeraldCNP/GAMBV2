import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepreIndexComponent } from './repre-index.component';

describe('RepreIndexComponent', () => {
  let component: RepreIndexComponent;
  let fixture: ComponentFixture<RepreIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepreIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepreIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
