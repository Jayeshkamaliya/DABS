import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommonAPIService } from '../CommonService/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(public commonAPIService: CommonAPIService) { }

  /** APPOINTMENT FIELD JSON MODEL */
  public appointment = {
    appointmentId: "",
    doctorId: "",
    patientId: "",
    drScheduleId: "",
    appointmentNumber: "",
    appointmentReason: "",
    appointmentTime: "",
    status: ""
  }

  /** GET DOCTOR LIST */
  getDoctorList() {
    return this.commonAPIService.getData('Doctor/GetDoctorList')
      .pipe(map(res => {
        return res.body;
      }));
  }

  /** GET APPOINTMENT No */
  getlastAppointmentNo() {
    return this.commonAPIService.getData('Appointment/GetLastAppointmentNo')
      .pipe(map(res => {
        return res.body;
      }));
  }

  /** BOOK DOCTOR APPOINTMENT */
  SaveAppointment(method: string, user: any) {    
    return this.commonAPIService.postData(method, user)
      .pipe(map(res => {
        return res.body;
      }));
  }

   /** GET PATIENT APPOINTMENT LIST */
   getAppointmentList(patientId:number,doctorId:number) {   
    return this.commonAPIService.getData('Appointment/GetAppointmentList?patientId='+patientId+'&doctorId='+doctorId)
      .pipe(map(res => {
        return res.body;
      }));
  }

  /** RESET APPOINTMENT FIELDS */
  resetAppointmentData() {
    this.appointment.appointmentId = "";
    this.appointment.doctorId = "";
    this.appointment.patientId = "";
    this.appointment.drScheduleId = "",
    this.appointment.appointmentNumber = "";
    this.appointment.appointmentReason = "";
    this.appointment.appointmentTime = "";
    this.appointment.status = "";
  }

}
