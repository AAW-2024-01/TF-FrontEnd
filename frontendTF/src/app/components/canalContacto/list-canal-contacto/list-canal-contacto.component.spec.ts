import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCanalContactoComponent } from './list-canal-contacto.component';

describe('ListCanalContactoComponent', () => {
  let component: ListCanalContactoComponent;
  let fixture: ComponentFixture<ListCanalContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCanalContactoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCanalContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
