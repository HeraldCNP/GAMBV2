import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaIndexComponent } from './auditoria-index.component';

describe('AuditoriaIndexComponent', () => {
  let component: AuditoriaIndexComponent;
  let fixture: ComponentFixture<AuditoriaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditoriaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditoriaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
