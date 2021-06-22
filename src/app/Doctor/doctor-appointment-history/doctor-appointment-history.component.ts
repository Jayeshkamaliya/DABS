import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PatientService } from 'src/app/Patient/patient.service';
import { CommonAPIService } from 'src/app/CommonService/common-api.service';
import { DoctorService } from '../doctor.service';
import { LoaderService } from 'src/app/loader/loader.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'doctorAppointmentHistory',
  templateUrl: './doctor-appointment-history.component.html',
  styleUrls: ['./doctor-appointment-history.component.css']
})
export class DoctorAppointmentHistoryComponent implements OnInit {

  /** VARIABLE DECLARED */
  public doctorDetails: any;
  public appointmentList: any = [];
  public selecteAppointmentView: any = {};

  /** ANGULAR DATATABLES VARIABLES */
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  /** CONSTRUCTOR */
  constructor(
    public patientService: PatientService,
    public commonAPIService: CommonAPIService,
    public doctorService: DoctorService,
    public router: Router,
    public loaderService:LoaderService,
    public constants:Constants
  ) { }

  /** INITIALIZE DATA*/
  ngOnInit() {
    this.loaderService.show();
    /** LOGGED IN DOCTOR DETAILS  */
    if (this.commonAPIService.UserDetails != null) {
      this.doctorDetails = this.commonAPIService.UserDetails[0];
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getDoctorAppointmentList();
  }

  /** GET DOCTOR APPOINTMENT LIST */
  getDoctorAppointmentList() {
    this.loaderService.show();
    this.patientService.getAppointmentList(0, this.doctorDetails.id)
      .subscribe(response => {
        if (Array.isArray(response) && response.length) {
          this.appointmentList = response;

          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
          this.loaderService.hide();
        }
      });
      this.loaderService.hide();
  }

  /** DOCTOR ACCEPT AND REJECT APPOINTMENT, UPDATE APPOINTMENT STATUS */
  onChangeStatus(status: string, appointmentId: number) {
    this.loaderService.show();
    let appointdata = {
      status: status,
      appointmentId: appointmentId
    }
    
    this.doctorService.updateAppointmentStatus('Doctor/UpdateAppointmentStatus', appointdata)
      .subscribe(res => {
        if (res[1] == 'Yes') {
          Swal.fire(
            'Appointment',
            'Appoinment is ' + status,
            'success'
          );
          this.loaderService.hide();
          this.router.navigate(['drProfile'],this.constants.routeNavParam);
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
