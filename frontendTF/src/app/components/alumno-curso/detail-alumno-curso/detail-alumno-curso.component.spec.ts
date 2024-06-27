import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAlumnoCursoComponent } from './detail-alumno-curso.component';

describe('DetailAlumnoCursoComponent', () => {
  let component: DetailAlumnoCursoComponent;
  let fixture: ComponentFixture<DetailAlumnoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailAlumnoCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAlumnoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
