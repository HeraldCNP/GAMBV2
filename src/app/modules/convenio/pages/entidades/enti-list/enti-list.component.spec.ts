import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiListComponent } from './enti-list.component';

describe('EntiListComponent', () => {
  let component: EntiListComponent;
  let fixture: ComponentFixture<EntiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntiListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
