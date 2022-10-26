import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveCreateComponent } from './conve-create.component';

describe('ConveCreateComponent', () => {
  let component: ConveCreateComponent;
  let fixture: ComponentFixture<ConveCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConveCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
