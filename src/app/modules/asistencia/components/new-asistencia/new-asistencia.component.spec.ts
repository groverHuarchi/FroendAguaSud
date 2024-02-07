import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAsistenciaComponent } from './new-asistencia.component';

describe('NewAsistenciaComponent', () => {
  let component: NewAsistenciaComponent;
  let fixture: ComponentFixture<NewAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
