import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorIndexComponent } from './proveedor-index.component';

describe('ProveedorIndexComponent', () => {
  let component: ProveedorIndexComponent;
  let fixture: ComponentFixture<ProveedorIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
