import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendicionIndexComponent } from './rendicion-index.component';

describe('RendicionIndexComponent', () => {
  let component: RendicionIndexComponent;
  let fixture: ComponentFixture<RendicionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendicionIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendicionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
