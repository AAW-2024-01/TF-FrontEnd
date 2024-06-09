import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHorarioComponent } from './detail-horario.component';

describe('DetailHorarioComponent', () => {
  let component: DetailHorarioComponent;
  let fixture: ComponentFixture<DetailHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
