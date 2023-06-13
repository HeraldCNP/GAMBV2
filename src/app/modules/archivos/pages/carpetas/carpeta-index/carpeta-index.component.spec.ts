import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetaIndexComponent } from './carpeta-index.component';

describe('CarpetaIndexComponent', () => {
  let component: CarpetaIndexComponent;
  let fixture: ComponentFixture<CarpetaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarpetaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpetaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
