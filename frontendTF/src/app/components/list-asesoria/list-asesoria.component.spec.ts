import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAsesoriaComponent } from './list-asesoria.component';

describe('ListAsesoriaComponent', () => {
  let component: ListAsesoriaComponent;
  let fixture: ComponentFixture<ListAsesoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAsesoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAsesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
