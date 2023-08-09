import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoDevenEditComponent } from './recurso-deven-edit.component';

describe('RecursoDevenEditComponent', () => {
  let component: RecursoDevenEditComponent;
  let fixture: ComponentFixture<RecursoDevenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursoDevenEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursoDevenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
