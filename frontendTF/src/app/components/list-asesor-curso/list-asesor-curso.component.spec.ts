import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAsesorCursoComponent } from './list-asesor-curso.component';

describe('ListAsesorCursoComponent', () => {
  let component: ListAsesorCursoComponent;
  let fixture: ComponentFixture<ListAsesorCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAsesorCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAsesorCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
