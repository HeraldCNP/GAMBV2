import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraIndexComponent } from './compra-index.component';

describe('CompraIndexComponent', () => {
  let component: CompraIndexComponent;
  let fixture: ComponentFixture<CompraIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
