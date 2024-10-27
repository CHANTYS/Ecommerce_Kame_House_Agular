import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseMPComponent } from './purchase-mp.component';

describe('PurchaseMPComponent', () => {
  let component: PurchaseMPComponent;
  let fixture: ComponentFixture<PurchaseMPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseMPComponent]
    });
    fixture = TestBed.createComponent(PurchaseMPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
