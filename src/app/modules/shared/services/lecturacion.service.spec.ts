import { TestBed } from '@angular/core/testing';

import { LecturacionService } from './lecturacion.service';

describe('LecturacionService', () => {
  let service: LecturacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecturacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
