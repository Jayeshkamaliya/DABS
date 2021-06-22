import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from './CommonService/authguard.guard';
import { DoctorAppointmentHistoryComponent } from './Doctor/doctor-appointment-history/doctor-appointment-history.component';
import { DoctorScheduleComponent } from './Doctor/doctor-schedule/doctor-schedule.component';
import { DrHeaderComponent } from './Doctor/dr-header/dr-header.component';
import { DrProfileComponent } from './Doctor/dr-profile/dr-profile.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookDoctorAppointmentComponent } from './Patient/book-doctor-appointment/book-doctor-appointment.component';
import { PatientAppointmentHistoryComponent } from './Patient/patient-appointment-history/patient-appointment-history.component';
import { PatientHeaderComponent } from './Patient/patient-header/patient-header.component';
import { PatientProfileComponent } from './Patient/patient-profile/patient-profile.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegistrationComponent
  },
  {
    path:'drheader',
    canActivate:[AuthguardGuard],  
    component:DrHeaderComponent ,
     
  },
  {
    path:'patientheader',
    component:PatientHeaderComponent,
    canActivate:[AuthguardGuard]    
  },
  {
    path:'drProfile',
    component:DrProfileComponent,
    canActivate:[AuthguardGuard]    
  } ,
  {
    path:'doctorSchedule',
    component:DoctorScheduleComponent,
    canActivate:[AuthguardGuard]    
  } ,
  {
    path:'doctorAppointmentHistory',
    component:DoctorAppointmentHistoryComponent,
    canActivate:[AuthguardGuard]    
  } ,
  {
    path:'patientProfile',
    component:PatientProfileComponent,
    canActivate:[AuthguardGuard]    
  }, 
  {
    path:'bookDoctorAppointment',
    component:BookDoctorAppointmentComponent,
    canActivate:[AuthguardGuard]    
  },
  {
    path:'patientAppointmentHistory',
    component:PatientAppointmentHistoryComponent,
    canActivate:[AuthguardGuard]    
  },
  
  

  //Wrong route
  { path: '**', component: PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
