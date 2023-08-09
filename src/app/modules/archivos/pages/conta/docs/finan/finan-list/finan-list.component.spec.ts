import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanListComponent } from './finan-list.component';

describe('FinanListComponent', () => {
  let component: FinanListComponent;
  let fixture: ComponentFixture<FinanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
