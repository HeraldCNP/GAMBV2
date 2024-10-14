import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciaIndexComponent } from './dependencia-index.component';

describe('DependenciaIndexComponent', () => {
  let component: DependenciaIndexComponent;
  let fixture: ComponentFixture<DependenciaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenciaIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependenciaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
