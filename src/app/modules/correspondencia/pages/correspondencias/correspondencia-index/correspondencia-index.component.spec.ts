import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondenciaIndexComponent } from './correspondencia-index.component';

describe('CorrespondenciaIndexComponent', () => {
  let component: CorrespondenciaIndexComponent;
  let fixture: ComponentFixture<CorrespondenciaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrespondenciaIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrespondenciaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
