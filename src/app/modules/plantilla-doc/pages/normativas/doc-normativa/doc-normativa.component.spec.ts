import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocNormativaComponent } from './doc-normativa.component';

describe('DocNormativaComponent', () => {
  let component: DocNormativaComponent;
  let fixture: ComponentFixture<DocNormativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocNormativaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocNormativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
