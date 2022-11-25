import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlimComponent } from './slim.component';

describe('SlimComponent', () => {
  let component: SlimComponent;
  let fixture: ComponentFixture<SlimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
