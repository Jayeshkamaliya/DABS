import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDoctorAppointmentComponent } from './book-doctor-appointment.component';

describe('BookDoctorAppointmentComponent', () => {
  let component: BookDoctorAppointmentComponent;
  let fixture: ComponentFixture<BookDoctorAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDoctorAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDoctorAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
