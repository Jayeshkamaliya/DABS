import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PatientService } from '../patient.service';
import { CommonAPIService } from 'src/app/CommonService/common-api.service';
import { LoaderService } from 'src/app/loader/loader.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'bookDoctorAppointment',
  templateUrl: './book-doctor-appointment.component.html',
  styleUrls: ['./book-doctor-appointment.component.css']
})
export class BookDoctorAppointmentComponent implements OnInit {

  /** VARIABLE DECLARED  */
  public docterList: any = [];
  public scheduleList: any = [];
  public patientDetails: any;
  public doctorScheduleDetails: any;
  public isDoctorDetailSet:boolean=false;
  public appointReason:string="";
  public lastAppointmentNumber:any;

  public colNameList: any = []
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    public patientService: PatientService,
    public commonAPIService: CommonAPIService,
    public loaderService:LoaderService,
    private router:Router,
    public constants:Constants
    ) { }

  ngOnInit() {
    this.loaderService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getDoctorList();
    if (this.commonAPIService.UserDetails != null) {
      this.patientDetails = this.commonAPIService.UserDetails[0];
    } 
    this.getMaxAppointmentNo();   
  }

  /** GET DOCTOR LIST */
  getDoctorList() {
    this.loaderService.show();
    this.patientService.getDoctorList()
      .subscribe(response => {
        if (Array.isArray(response) && response.length) {
          this.docterList = response;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
          this.loaderService.hide();
        }
      });
  }

   /** GET DOCTOR LIST */
   getMaxAppointmentNo() {
    this.loaderService.show();
    this.patientService.getlastAppointmentNo()
      .subscribe(response => {         
        if (response[1] != "") {                
          this.lastAppointmentNumber = parseInt(response[1])+1;          
        }else{
          this.lastAppointmentNumber=1;
        }
      });
      this.loaderService.hide();
  }

  /** DOCTOR DETAILS SET FOR BOOK APPOINTMENT */
  bookAppointment(doctorSchedule: any) {
    this.loaderService.show();
    if (doctorSchedule != null) {
      this.doctorScheduleDetails = doctorSchedule;
      this.isDoctorDetailSet=true;
      this.loaderService.hide();
    }
  }

   /** CLOSE APPOINTMENT MODAL */
   hideDrApptModal(): void {
    document.getElementById('close-drModal').click();
    this.doctorScheduleDetails="";
    this.appointReason="";
    this.isDoctorDetailSet=false;
  }

  /** SAVE DOCTOR APPOINTMENT */
  saveDoctorAppointment(){   
    this.loaderService.show();
    this.patientService.appointment.doctorId=this.doctorScheduleDetails.id;
    this.patientService.appointment.patientId=this.patientDetails.id;
    this.patientService.appointment.drScheduleId=this.doctorScheduleDetails.drScheduleId
    this.patientService.appointment.appointmentNumber=String(this.lastAppointmentNumber);
    this.patientService.appointment.appointmentReason=this.appointReason;
    this.patientService.appointment.appointmentTime=this.doctorScheduleDetails.appointmentTime;
    this.patientService.appointment.status="inprogress";

    this.patientService.SaveAppointment("Appointment/SaveAppointment", this.patientService.appointment)
        .subscribe(res => {                 
          if (res[1] == 'Yes') {
            Swal.fire(
              'Appointment',
              'Your appointment request is sent.. .!',
              'success'
            );
            this.patientService.resetAppointmentData();
            this.hideDrApptModal();  
            this.loaderService.hide();
            this.router.navigate(['patientProfile'],this.constants.routeNavParam);              
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
        this.loaderService.hide();
  }
 

}
