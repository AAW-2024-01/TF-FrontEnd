import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCanalContactoComponent } from './detail-canal-contacto.component';

describe('DetailCanalContactoComponent', () => {
  let component: DetailCanalContactoComponent;
  let fixture: ComponentFixture<DetailCanalContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailCanalContactoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCanalContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
