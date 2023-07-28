import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevenListComponent } from './deven-list.component';

describe('DevenListComponent', () => {
  let component: DevenListComponent;
  let fixture: ComponentFixture<DevenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevenListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
