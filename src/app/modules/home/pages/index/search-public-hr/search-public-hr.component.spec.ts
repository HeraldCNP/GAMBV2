import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPublicHrComponent } from './search-public-hr.component';

describe('SearchPublicHrComponent', () => {
  let component: SearchPublicHrComponent;
  let fixture: ComponentFixture<SearchPublicHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPublicHrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPublicHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
