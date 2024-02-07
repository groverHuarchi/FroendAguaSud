import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLecturacionComponent } from './update-lecturacion.component';

describe('UpdateLecturacionComponent', () => {
  let component: UpdateLecturacionComponent;
  let fixture: ComponentFixture<UpdateLecturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLecturacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLecturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
