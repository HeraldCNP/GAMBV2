import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloIndexComponent } from './articulo-index.component';

describe('ArticuloIndexComponent', () => {
  let component: ArticuloIndexComponent;
  let fixture: ComponentFixture<ArticuloIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
