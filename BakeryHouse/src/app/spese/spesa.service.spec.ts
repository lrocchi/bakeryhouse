import { TestBed, inject } from '@angular/core/testing';

import { SpesaService } from './spesa.service';

describe('SpesaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpesaService]
    });
  });

  it('should be created', inject([SpesaService], (service: SpesaService) => {
    expect(service).toBeTruthy();
  }));
});
