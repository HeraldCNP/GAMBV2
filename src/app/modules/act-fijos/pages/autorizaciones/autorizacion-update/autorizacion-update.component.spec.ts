import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionUpdateComponent } from './autorizacion-update.component';

describe('AutorizacionUpdateComponent', () => {
  let component: AutorizacionUpdateComponent;
  let fixture: ComponentFixture<AutorizacionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorizacionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
