import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoIndexComponent } from './vehiculo-index.component';

describe('VehiculoIndexComponent', () => {
  let component: VehiculoIndexComponent;
  let fixture: ComponentFixture<VehiculoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculoIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
