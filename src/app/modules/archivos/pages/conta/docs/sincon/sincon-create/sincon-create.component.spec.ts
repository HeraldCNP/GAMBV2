import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinconCreateComponent } from './sincon-create.component';

describe('SinconCreateComponent', () => {
  let component: SinconCreateComponent;
  let fixture: ComponentFixture<SinconCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinconCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinconCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
