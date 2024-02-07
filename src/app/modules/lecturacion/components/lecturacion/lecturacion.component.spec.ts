import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturacionComponent } from './lecturacion.component';

describe('LecturacionComponent', () => {
  let component: LecturacionComponent;
  let fixture: ComponentFixture<LecturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
