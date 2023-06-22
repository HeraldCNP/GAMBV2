import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaIndexComponent } from './conta-index.component';

describe('ContaIndexComponent', () => {
  let component: ContaIndexComponent;
  let fixture: ComponentFixture<ContaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
