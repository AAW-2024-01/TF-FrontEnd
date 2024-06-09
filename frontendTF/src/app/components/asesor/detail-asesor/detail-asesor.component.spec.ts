import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAsesorComponent } from './detail-asesor.component';

describe('DetailAsesorComponent', () => {
  let component: DetailAsesorComponent;
  let fixture: ComponentFixture<DetailAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailAsesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
