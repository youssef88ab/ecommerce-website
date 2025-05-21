import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivrerSidebarComponent } from './delivrer-sidebar.component';

describe('DelivrerSidebarComponent', () => {
  let component: DelivrerSidebarComponent;
  let fixture: ComponentFixture<DelivrerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelivrerSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelivrerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
