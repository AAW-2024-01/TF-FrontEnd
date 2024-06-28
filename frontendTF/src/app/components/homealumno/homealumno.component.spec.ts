import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomealumnoComponent } from './homealumno.component';

describe('HomealumnoComponent', () => {
  let component: HomealumnoComponent;
  let fixture: ComponentFixture<HomealumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomealumnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomealumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
