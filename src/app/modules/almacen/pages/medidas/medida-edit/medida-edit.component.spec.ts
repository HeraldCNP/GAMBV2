import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaEditComponent } from './medida-edit.component';

describe('MedidaEditComponent', () => {
  let component: MedidaEditComponent;
  let fixture: ComponentFixture<MedidaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedidaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedidaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
