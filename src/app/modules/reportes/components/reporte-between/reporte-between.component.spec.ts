import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteBetweenComponent } from './reporte-between.component';

describe('ReporteBetweenComponent', () => {
  let component: ReporteBetweenComponent;
  let fixture: ComponentFixture<ReporteBetweenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteBetweenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteBetweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
