import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentHistoryComponent } from './doctor-appointment-history.component';

describe('DoctorAppointmentHistoryComponent', () => {
  let component: DoctorAppointmentHistoryComponent;
  let fixture: ComponentFixture<DoctorAppointmentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAppointmentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAppointmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
