import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAsistenciaComponent } from './update-asistencia.component';

describe('UpdateAsistenciaComponent', () => {
  let component: UpdateAsistenciaComponent;
  let fixture: ComponentFixture<UpdateAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
