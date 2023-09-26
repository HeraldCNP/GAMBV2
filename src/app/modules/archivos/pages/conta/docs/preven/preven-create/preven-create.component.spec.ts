import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevenCreateComponent } from './PrevenCreateComponent';

describe('PrevenCreateComponent', () => {
  let component: PrevenCreateComponent;
  let fixture: ComponentFixture<PrevenCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevenCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevenCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
