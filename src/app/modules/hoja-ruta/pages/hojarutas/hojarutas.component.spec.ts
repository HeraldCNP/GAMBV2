import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HojarutasComponent } from './hojarutas.component';

describe('HojarutasComponent', () => {
  let component: HojarutasComponent;
  let fixture: ComponentFixture<HojarutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HojarutasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HojarutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
