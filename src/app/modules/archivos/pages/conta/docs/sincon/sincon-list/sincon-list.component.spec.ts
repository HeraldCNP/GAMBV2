import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinconListComponent } from './sincon-list.component';

describe('SinconListComponent', () => {
  let component: SinconListComponent;
  let fixture: ComponentFixture<SinconListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinconListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
