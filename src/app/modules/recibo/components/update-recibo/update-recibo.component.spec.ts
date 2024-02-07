import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReciboComponent } from './update-recibo.component';

describe('UpdateReciboComponent', () => {
  let component: UpdateReciboComponent;
  let fixture: ComponentFixture<UpdateReciboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReciboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
