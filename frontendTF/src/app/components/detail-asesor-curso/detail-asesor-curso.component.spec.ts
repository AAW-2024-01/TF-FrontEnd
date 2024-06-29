import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAsesorCursoComponent } from './detail-asesor-curso.component';

describe('DetailAsesorCursoComponent', () => {
  let component: DetailAsesorCursoComponent;
  let fixture: ComponentFixture<DetailAsesorCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailAsesorCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAsesorCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
