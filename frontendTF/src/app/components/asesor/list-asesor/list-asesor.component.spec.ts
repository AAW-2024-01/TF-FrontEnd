import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAsesorComponent } from './list-asesor.component';

describe('ListAsesorComponent', () => {
  let component: ListAsesorComponent;
  let fixture: ComponentFixture<ListAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAsesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
