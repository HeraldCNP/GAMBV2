import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepreCreateComponent } from './repre-create.component';

describe('RepreCreateComponent', () => {
  let component: RepreCreateComponent;
  let fixture: ComponentFixture<RepreCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepreCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepreCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
