import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTarifaComponent } from './new-tarifa.component';

describe('NewTarifaComponent', () => {
  let component: NewTarifaComponent;
  let fixture: ComponentFixture<NewTarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTarifaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
