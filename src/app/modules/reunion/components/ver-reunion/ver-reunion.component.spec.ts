import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReunionComponent } from './ver-reunion.component';

describe('VerReunionComponent', () => {
  let component: VerReunionComponent;
  let fixture: ComponentFixture<VerReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
