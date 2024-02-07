import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLecturacionComponent } from './new-lecturacion.component';

describe('NewLecturacionComponent', () => {
  let component: NewLecturacionComponent;
  let fixture: ComponentFixture<NewLecturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLecturacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLecturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
