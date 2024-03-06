import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeListAutorizacionComponent } from './vale-list-autorizacion.component';

describe('ValeListAutorizacionComponent', () => {
  let component: ValeListAutorizacionComponent;
  let fixture: ComponentFixture<ValeListAutorizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValeListAutorizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValeListAutorizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
