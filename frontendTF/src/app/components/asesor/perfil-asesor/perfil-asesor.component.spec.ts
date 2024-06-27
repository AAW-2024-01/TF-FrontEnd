import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:frontendTF/src/app/components/asesoria/detail-asesoria/detail-asesoria.component.spec.ts
import { DetailAsesoriaComponent } from './detail-asesoria.component';

describe('DetailAsesoriaComponent', () => {
  let component: DetailAsesoriaComponent;
  let fixture: ComponentFixture<DetailAsesoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailAsesoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAsesoriaComponent);
========
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
>>>>>>>> origin/Josue-Moreira:frontendTF/src/app/components/asesor/perfil-asesor/perfil-asesor.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
