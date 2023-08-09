import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoDevenListComponent } from './recurso-deven-list.component';

describe('RecursoDevenListComponent', () => {
  let component: RecursoDevenListComponent;
  let fixture: ComponentFixture<RecursoDevenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursoDevenListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursoDevenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
