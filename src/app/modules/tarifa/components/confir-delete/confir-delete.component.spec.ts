import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirDeleteComponent } from './confir-delete.component';

describe('ConfirDeleteComponent', () => {
  let component: ConfirDeleteComponent;
  let fixture: ComponentFixture<ConfirDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
