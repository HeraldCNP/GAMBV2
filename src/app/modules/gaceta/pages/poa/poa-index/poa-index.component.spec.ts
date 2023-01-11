import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoaIndexComponent } from './poa-index.component';

describe('PoaIndexComponent', () => {
  let component: PoaIndexComponent;
  let fixture: ComponentFixture<PoaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
