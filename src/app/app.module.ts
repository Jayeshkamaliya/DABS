import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { DrHeaderComponent } from './Doctor/dr-header/dr-header.component';
import { PatientHeaderComponent } from './Patient/patient-header/patient-header.component';
import { AuthguardGuard } from './CommonService/authguard.guard';
import { DrProfileComponent } from './Doctor/dr-profile/dr-profile.component';
import { PatientProfileComponent } from './Patient/patient-profile/patient-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DoctorScheduleComponent } from './Doctor/doctor-schedule/doctor-schedule.component';
import { BookDoctorAppointmentComponent } from './Patient/book-doctor-appointment/book-doctor-appointment.component';
import { PatientAppointmentHistoryComponent } from './Patient/patient-appointment-history/patient-appointment-history.component';
import { DoctorAppointmentHistoryComponent } from './Doctor/doctor-appointment-history/doctor-appointment-history.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { Constants } from './models/constants';

@NgModule({
  declarations: [
    AppComponent,   
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    DrHeaderComponent,
    PatientHeaderComponent,
    DrProfileComponent,
    PatientProfileComponent,
    PageNotFoundComponent,
    DoctorScheduleComponent,
    BookDoctorAppointmentComponent,
    PatientAppointmentHistoryComponent,
    DoctorAppointmentHistoryComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    AuthguardGuard,
    DatePipe,    
    Constants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
