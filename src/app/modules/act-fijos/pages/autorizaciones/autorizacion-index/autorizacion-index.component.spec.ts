import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionIndexComponent } from './autorizacion-index.component';

describe('AutorizacionIndexComponent', () => {
  let component: AutorizacionIndexComponent;
  let fixture: ComponentFixture<AutorizacionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorizacionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
