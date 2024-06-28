import { TestBed } from '@angular/core/testing';

import { DetalleHorarioService } from './detalle-horario.service';

describe('DetalleHorarioService', () => {
  let service: DetalleHorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleHorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
