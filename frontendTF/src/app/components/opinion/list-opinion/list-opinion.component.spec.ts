import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOpinionComponent } from './list-opinion.component';

describe('ListOpinionComponent', () => {
  let component: ListOpinionComponent;
  let fixture: ComponentFixture<ListOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOpinionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
