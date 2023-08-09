import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoDevenCreateComponent } from './recurso-deven-create.component';

describe('RecursoDevenCreateComponent', () => {
  let component: RecursoDevenCreateComponent;
  let fixture: ComponentFixture<RecursoDevenCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursoDevenCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursoDevenCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
