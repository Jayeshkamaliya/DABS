import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { DatePipe } from '@angular/common';
import { CommonAPIService } from '../../CommonService/common-api.service';
import { LoaderService } from 'src/app/loader/loader.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'doctorSchedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.css']
})
export class DoctorScheduleComponent implements OnInit {

  /** VARIABLE DECLARATION */
  date: Date;
  dateMax: string = "";
  dateMin: string = "";

  public weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  public doctorDetails: any;
  public scheduleList: any = [];

  public colNameList: any = []
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    public doctorService: DoctorService,
    private datePipe: DatePipe,
    public commonAPIService: CommonAPIService,
    public loaderService:LoaderService
  ) { }

  ngOnInit() {
    this.loaderService.show();
    if (this.commonAPIService.UserDetails != null) {
      this.doctorDetails = this.commonAPIService.UserDetails[0];
      this.getSchedulData(this.doctorDetails.id);
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5
      };
    }
    this.getMinMaxDate();
  }

  /** SCHEDULE DATE MIN AND MAX DATE SET  */
  getMinMaxDate() {
    this.loaderService.show();
    this.date = new Date();

    this.date.setDate(this.date.getDate());
    this.dateMin = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.doctorService.doctorScheduleSet.scheduleDate=this.dateMin;

    this.date.setDate(this.date.getDate() + 6);
    this.dateMax = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.loaderService.hide();
  }

  /** SCHEDULE END TIME VALIDATION */
  endTimeCheck(startTime, endTime) {  
    this.loaderService.show();  
    if (endTime <= startTime) {
      Swal.fire(
        'Schedule Time',
        'endTime must be greater than startTime',
        'error'
      );
      this.doctorService.doctorScheduleSet.scheduleEndTime = "";
    }
    this.loaderService.hide();
  }

  /** ONLY NUMBER VALIDATION */
  numberOnly(event): boolean {
    this.loaderService.show();  
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    this.loaderService.hide();  
    return true;

  }

  /** SAVE DOCTOR SCHEDULE DETAIL  */
  saveDoctorSchedule() {
    this.loaderService.show();  
    this.doctorService.doctorScheduleSet.doctorId = this.doctorDetails.id;
    this.doctorService.doctorScheduleSet.doctorScheduleStatus = "active";

    let scheduleDate = new Date(this.doctorService.doctorScheduleSet.scheduleDate);
    this.doctorService.doctorScheduleSet.scheduleDay = this.weekday[scheduleDate.getDay()];
    
    if (this.doctorScheduleValidation()) {      
      this.doctorService.saveSchedule("Doctor/SaveSchedule", this.doctorService.doctorScheduleSet)
        .subscribe(res => {          
          if (res[1] == 'Yes') {
            Swal.fire(
              'Schedule Time',
              'Your Schedule time added successfully.. .!',
              'success'
            );
            this.doctorService.resetDoctorSchedule();
            this.hideDrScheduleModal();
            this.getSchedulData(this.doctorDetails.id);
            this.loaderService.hide();  
          }
          else if (res[1] == 'No') {
            Swal.fire(
              'Oops',
              'Something is wrong, please try again',
              'error'
            );
            this.loaderService.hide();  
          }
        });
    }
    this.loaderService.hide();  
  }

  /** GET SCHEDULE DATA BY ID */
  getSchedulData(doctorId) {
    this.loaderService.show();  
    if (doctorId > 0) {
      this.doctorService.getScheduleList(doctorId)
        .subscribe(response => {          
          if (Array.isArray(response) && response.length) {
            this.scheduleList = response;

            const key = 'scheduleDay';
            const arrayUniqueByKey = [...new Map(this.scheduleList.map(item =>
              [item[key], item])).values()];
            this.colNameList = arrayUniqueByKey;
          
            // Calling the DT trigger to manually render the table
            this.dtTrigger.next();
            this.loaderService.hide();  
          }
        });
    }
    this.loaderService.hide();  
  }


  /** DOCTOR SCHEDULE VALIDATION  */
  doctorScheduleValidation() {
    var result = true;    
    if (this.doctorService.doctorScheduleSet.scheduleDate == "" ||
      this.doctorService.doctorScheduleSet.scheduleStartTime == "" ||
      this.doctorService.doctorScheduleSet.scheduleEndTime == "") {
      result = false;
    }
    return result;
  }


  /** CLOSE DOCTOR SCHEDULE MODAL */
  hideDrScheduleModal(): void {
    document.getElementById('close-drModal').click();
    this.doctorService.resetDoctorSchedule();
  }

}
