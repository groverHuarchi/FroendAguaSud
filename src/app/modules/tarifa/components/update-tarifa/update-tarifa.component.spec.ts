import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTarifaComponent } from './update-tarifa.component';

describe('UpdateTarifaComponent', () => {
  let component: UpdateTarifaComponent;
  let fixture: ComponentFixture<UpdateTarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTarifaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
