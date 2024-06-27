import { TestBed } from '@angular/core/testing';

import { AsesorCursoService } from './asesor-curso.service';

describe('AsesorCursoService', () => {
  let service: AsesorCursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsesorCursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
