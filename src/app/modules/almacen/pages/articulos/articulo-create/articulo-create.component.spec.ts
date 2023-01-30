import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCreateComponent } from './articulo-create.component';

describe('ArticuloCreateComponent', () => {
  let component: ArticuloCreateComponent;
  let fixture: ComponentFixture<ArticuloCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
