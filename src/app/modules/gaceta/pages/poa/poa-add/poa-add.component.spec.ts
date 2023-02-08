import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoaAddComponent } from './poa-add.component';

describe('PoaAddComponent', () => {
  let component: PoaAddComponent;
  let fixture: ComponentFixture<PoaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoaAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
