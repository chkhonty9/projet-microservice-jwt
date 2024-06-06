import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotDeliveredCartsComponent } from './not-delivered-carts.component';

describe('NotDeliveredCartsComponent', () => {
  let component: NotDeliveredCartsComponent;
  let fixture: ComponentFixture<NotDeliveredCartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotDeliveredCartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotDeliveredCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
