import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionCreateComponent } from './autorizacion-create.component';

describe('AutorizacionCreateComponent', () => {
  let component: AutorizacionCreateComponent;
  let fixture: ComponentFixture<AutorizacionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorizacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
