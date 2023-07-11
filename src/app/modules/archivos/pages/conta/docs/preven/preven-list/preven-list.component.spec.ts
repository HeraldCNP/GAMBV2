import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevenListComponent } from './preven-list.component';

describe('PrevenListComponent', () => {
  let component: PrevenListComponent;
  let fixture: ComponentFixture<PrevenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevenListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
