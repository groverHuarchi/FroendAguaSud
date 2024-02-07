import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMedidorComponent } from './delete-medidor.component';

describe('DeleteMedidorComponent', () => {
  let component: DeleteMedidorComponent;
  let fixture: ComponentFixture<DeleteMedidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMedidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMedidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
