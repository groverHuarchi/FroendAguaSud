import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedidorComponent } from './update-medidor.component';

describe('UpdateMedidorComponent', () => {
  let component: UpdateMedidorComponent;
  let fixture: ComponentFixture<UpdateMedidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMedidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMedidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
