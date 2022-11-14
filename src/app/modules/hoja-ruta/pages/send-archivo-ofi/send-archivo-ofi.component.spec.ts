import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendArchivoOfiComponent } from './send-archivo-ofi.component';

describe('SendArchivoOfiComponent', () => {
  let component: SendArchivoOfiComponent;
  let fixture: ComponentFixture<SendArchivoOfiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendArchivoOfiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendArchivoOfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
