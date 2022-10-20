import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepreUpdateComponent } from './repre-update.component';

describe('RepreUpdateComponent', () => {
  let component: RepreUpdateComponent;
  let fixture: ComponentFixture<RepreUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepreUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepreUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
