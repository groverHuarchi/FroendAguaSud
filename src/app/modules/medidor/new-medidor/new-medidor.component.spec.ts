import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMedidorComponent } from './new-medidor.component';

describe('NewMedidorComponent', () => {
  let component: NewMedidorComponent;
  let fixture: ComponentFixture<NewMedidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMedidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMedidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
