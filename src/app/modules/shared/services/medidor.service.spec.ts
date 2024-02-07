import { TestBed } from '@angular/core/testing';

import { MedidorService } from './medidor.service';

describe('MedidorService', () => {
  let service: MedidorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedidorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
