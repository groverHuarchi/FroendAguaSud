import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSocioComponent } from './new-socio.component';

describe('NewSocioComponent', () => {
  let component: NewSocioComponent;
  let fixture: ComponentFixture<NewSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
