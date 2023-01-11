import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoaUpdateComponent } from './poa-update.component';

describe('PoaUpdateComponent', () => {
  let component: PoaUpdateComponent;
  let fixture: ComponentFixture<PoaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoaUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
