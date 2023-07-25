import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevenEditComponent } from './preven-edit.component';

describe('PrevenEditComponent', () => {
  let component: PrevenEditComponent;
  let fixture: ComponentFixture<PrevenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevenEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
