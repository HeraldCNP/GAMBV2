import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCorrespondeciaIndexComponent } from './mi-correspondecia-index.component';

describe('MiCorrespondeciaIndexComponent', () => {
  let component: MiCorrespondeciaIndexComponent;
  let fixture: ComponentFixture<MiCorrespondeciaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiCorrespondeciaIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiCorrespondeciaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
