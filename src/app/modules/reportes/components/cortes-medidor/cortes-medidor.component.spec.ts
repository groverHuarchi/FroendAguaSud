import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CortesMedidorComponent } from './cortes-medidor.component';

describe('CortesMedidorComponent', () => {
  let component: CortesMedidorComponent;
  let fixture: ComponentFixture<CortesMedidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CortesMedidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CortesMedidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
