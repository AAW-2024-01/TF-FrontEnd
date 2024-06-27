import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
