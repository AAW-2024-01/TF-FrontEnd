import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOpinionComponent } from './detail-opinion.component';

describe('DetailOpinionComponent', () => {
  let component: DetailOpinionComponent;
  let fixture: ComponentFixture<DetailOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailOpinionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
