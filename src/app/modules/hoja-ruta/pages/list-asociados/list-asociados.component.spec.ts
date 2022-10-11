import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAsociadosComponent } from './list-asociados.component';

describe('ListAsociadosComponent', () => {
  let component: ListAsociadosComponent;
  let fixture: ComponentFixture<ListAsociadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAsociadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
