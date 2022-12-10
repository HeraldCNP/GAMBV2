import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GacetaCreateComponent } from './gaceta-create.component';

describe('GacetaCreateComponent', () => {
  let component: GacetaCreateComponent;
  let fixture: ComponentFixture<GacetaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GacetaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GacetaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
