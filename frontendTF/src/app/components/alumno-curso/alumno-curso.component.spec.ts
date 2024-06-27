import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoCursoComponent } from './alumno-curso.component';

describe('AlumnoCursoComponent', () => {
  let component: AlumnoCursoComponent;
  let fixture: ComponentFixture<AlumnoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlumnoCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
