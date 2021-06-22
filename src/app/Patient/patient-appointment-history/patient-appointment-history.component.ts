import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PatientService } from '../patient.service';
import { CommonAPIService } from 'src/app/CommonService/common-api.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'patientAppointmentHistory',
  templateUrl: './patient-appointment-history.component.html',
  styleUrls: ['./patient-appointment-history.component.css']
})
export class PatientAppointmentHistoryComponent implements OnInit {

  /** VARIABLE DECLARED */
  public patientDetails: any;
  public appointmentList: any = [];
  public selecteAppointmentView: any = {};

  /** ANGULAR DATATABLES VARIABLES */
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  /** CONSTRUCTOR */
  constructor(
    public patientService: PatientService,
    public commonAPIService: CommonAPIService,
    public loaderService: LoaderService
  ) { }

  ngOnInit() {
   
    if (this.commonAPIService.UserDetails != null) {
      this.patientDetails = this.commonAPIService.UserDetails[0];
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getPatientAppointmentList();
  }

  /** GET PATIENT APPOINTMENT LIST */
  getPatientAppointmentList() {
    this.loaderService.show();
    this.patientService.getAppointmentList(this.patientDetails.id, 0)
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

  /** SET SCHEDULE DETAILS FOR VIEW */
  viewAppointment(appointment) {
    this.loaderService.show();
    this.selecteAppointmentView = appointment;
    this.loaderService.hide();
  }

  /** HIDE VIEW APPOINTMENT MODEL */
  hideViewAppointmentModel() {
    this.selecteAppointmentView = "";
    document.getElementById('close-viewApptModal').click();
  }

}
