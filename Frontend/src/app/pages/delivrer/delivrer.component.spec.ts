import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivrerComponent } from './delivrer.component';

describe('DelivrerComponent', () => {
  let component: DelivrerComponent;
  let fixture: ComponentFixture<DelivrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelivrerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelivrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
