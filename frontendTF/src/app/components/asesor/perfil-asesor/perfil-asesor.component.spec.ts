import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAsesorComponent } from './perfil-asesor.component';

describe('PerfilAsesorComponent', () => {
  let component: PerfilAsesorComponent;
  let fixture: ComponentFixture<PerfilAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilAsesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
