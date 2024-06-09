import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCursoComponent } from './detail-curso.component';

describe('DetailCursoComponent', () => {
  let component: DetailCursoComponent;
  let fixture: ComponentFixture<DetailCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
