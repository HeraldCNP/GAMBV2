import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashsboardComponent } from './dashsboard.component';

describe('DashsboardComponent', () => {
  let component: DashsboardComponent;
  let fixture: ComponentFixture<DashsboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashsboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashsboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
