import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GacetaUpdateComponent } from './gaceta-update.component';

describe('GacetaUpdateComponent', () => {
  let component: GacetaUpdateComponent;
  let fixture: ComponentFixture<GacetaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GacetaUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GacetaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
