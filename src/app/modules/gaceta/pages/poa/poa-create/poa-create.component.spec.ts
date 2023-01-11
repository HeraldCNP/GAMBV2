import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoaCreateComponent } from './poa-create.component';

describe('PoaCreateComponent', () => {
  let component: PoaCreateComponent;
  let fixture: ComponentFixture<PoaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
