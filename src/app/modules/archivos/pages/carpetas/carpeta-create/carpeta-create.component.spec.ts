import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetaCreateComponent } from './carpeta-create.component';

describe('CarpetaCreateComponent', () => {
  let component: CarpetaCreateComponent;
  let fixture: ComponentFixture<CarpetaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarpetaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpetaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
