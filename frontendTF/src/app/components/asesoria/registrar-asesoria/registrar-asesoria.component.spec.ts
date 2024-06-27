import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAsesoriaComponent } from './registrar-asesoria.component';

describe('RegistrarAsesoriaComponent', () => {
  let component: RegistrarAsesoriaComponent;
  let fixture: ComponentFixture<RegistrarAsesoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarAsesoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarAsesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
