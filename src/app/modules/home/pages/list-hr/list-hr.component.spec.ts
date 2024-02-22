import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHrComponent } from './list-hr.component';

describe('ListHrComponent', () => {
  let component: ListHrComponent;
  let fixture: ComponentFixture<ListHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
