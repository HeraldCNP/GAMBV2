import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveFileComponent } from './conve-file.component';

describe('ConveFileComponent', () => {
  let component: ConveFileComponent;
  let fixture: ComponentFixture<ConveFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConveFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
