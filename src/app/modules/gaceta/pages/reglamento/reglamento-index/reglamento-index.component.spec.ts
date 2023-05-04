import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglamentoIndexComponent } from './reglamento-index.component';

describe('ReglamentoIndexComponent', () => {
  let component: ReglamentoIndexComponent;
  let fixture: ComponentFixture<ReglamentoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglamentoIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReglamentoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
