import { TestBed } from '@angular/core/testing';

import { CambiosdeIdService } from './cambiosde-id.service';

describe('CambiosdeIdService', () => {
  let service: CambiosdeIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambiosdeIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
