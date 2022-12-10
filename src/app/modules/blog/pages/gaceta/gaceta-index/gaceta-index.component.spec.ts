import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GacetaIndexComponent } from './gaceta-index.component';

describe('GacetaIndexComponent', () => {
  let component: GacetaIndexComponent;
  let fixture: ComponentFixture<GacetaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GacetaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GacetaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
