import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposNormativaComponent } from './tipos-normativa.component';

describe('TiposNormativaComponent', () => {
  let component: TiposNormativaComponent;
  let fixture: ComponentFixture<TiposNormativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposNormativaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposNormativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
