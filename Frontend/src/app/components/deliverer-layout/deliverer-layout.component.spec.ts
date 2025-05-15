import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererLayoutComponent } from './deliverer-layout.component';

describe('DelivererLayoutComponent', () => {
  let component: DelivererLayoutComponent;
  let fixture: ComponentFixture<DelivererLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelivererLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelivererLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
