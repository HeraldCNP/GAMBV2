import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeCreateComponent } from './vale-create.component';

describe('ValeCreateComponent', () => {
  let component: ValeCreateComponent;
  let fixture: ComponentFixture<ValeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
