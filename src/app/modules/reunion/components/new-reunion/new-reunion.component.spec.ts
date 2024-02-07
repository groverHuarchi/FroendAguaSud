import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReunionComponent } from './new-reunion.component';

describe('NewReunionComponent', () => {
  let component: NewReunionComponent;
  let fixture: ComponentFixture<NewReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
