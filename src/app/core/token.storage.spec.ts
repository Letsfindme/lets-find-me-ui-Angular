import { TestBed } from '@angular/core/testing';

import { Token.StorageService } from './token.storage.service';

describe('Token.StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Token.StorageService = TestBed.get(Token.StorageService);
    expect(service).toBeTruthy();
  });
});
