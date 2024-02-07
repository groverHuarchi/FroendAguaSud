import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMedidorComponent } from './ver-medidor.component';

describe('VerMedidorComponent', () => {
  let component: VerMedidorComponent;
  let fixture: ComponentFixture<VerMedidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMedidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMedidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
