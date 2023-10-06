import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinconEditComponent } from './sincon-edit.component';

describe('SinconEditComponent', () => {
  let component: SinconEditComponent;
  let fixture: ComponentFixture<SinconEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinconEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinconEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
