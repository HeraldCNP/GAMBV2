import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatPrograIndexComponent } from './cat-progra-index.component';

describe('CatPrograIndexComponent', () => {
  let component: CatPrograIndexComponent;
  let fixture: ComponentFixture<CatPrograIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatPrograIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatPrograIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
