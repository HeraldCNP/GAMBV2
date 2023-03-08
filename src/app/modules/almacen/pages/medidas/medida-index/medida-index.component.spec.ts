import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaIndexComponent } from './medida-index.component';

describe('MedidaIndexComponent', () => {
  let component: MedidaIndexComponent;
  let fixture: ComponentFixture<MedidaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedidaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedidaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
