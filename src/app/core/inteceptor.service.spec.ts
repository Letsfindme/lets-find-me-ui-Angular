import { TestBed } from '@angular/core/testing';

import { InteceptorService } from './inteceptor.service';

describe('InteceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InteceptorService = TestBed.get(InteceptorService);
    expect(service).toBeTruthy();
  });
});
