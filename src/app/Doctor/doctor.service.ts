import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommonAPIService } from '../CommonService/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private commonAPIService: CommonAPIService
  ) {
  }

  public doctorId = 0;

  /** DOCTOR SCHEDULE MODAL */
  public doctorScheduleSet = {
    doctorId: "0",
    scheduleDate: "",
    scheduleStartTime: "",
    scheduleEndTime: "",
    scheduleDay: "",
    doctorScheduleStatus: "",
    avgConsultingTime: ""
  }

  /** ADD DOCTOR SCHEDULE DETAIL */
  saveSchedule(method: string, data: any) {
    return this.commonAPIService.postData(method, data)
      .pipe(map(res => {
        return res.body;
      }));
  }

  /** ADD DOCTOR SCHEDULE DETAIL */
  getScheduleList(id: number) {
    return this.commonAPIService.getData('Doctor/GetScheduleData?doctorId=' + id)
      .pipe(map(res => {
        return res.body;
      }));
  }

  /** ADD DOCTOR SCHEDULE DETAIL */
  updateAppointmentStatus(method: string, dataObj: any) {
    return this.commonAPIService.postData(method, dataObj)
      .pipe(map(res => {
        return res.body;
      }));
  }

  /** RESET DOCTOR SCHEDULE DETAIL */
  resetDoctorSchedule() {
    this.doctorScheduleSet.doctorId = "";
    this.doctorScheduleSet.scheduleDate = "";
    this.doctorScheduleSet.scheduleStartTime = "";
    this.doctorScheduleSet.scheduleEndTime = "";
    this.doctorScheduleSet.doctorScheduleStatus = "";
    this.doctorScheduleSet.avgConsultingTime = "";
  }
}
