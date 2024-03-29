import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'app/login/login.component';
import { AuthGuard } from 'app/_guards/auth.guard';
import { HomeComponent } from 'app/home/home.component';

import { ManagementComponent } from 'app/management/management.component';
import { GeneralReportComponent } from 'app/report/general-report.component';
import { LogoutComponent } from 'app/logout.component';
import { IncidenzaReportComponent } from 'app/report/incidenza-report/incidenza-report.component';
import { ReportRendicontiComponent } from './report/report-rendiconti/report-rendiconti.component';
import { ReportSpeseComponent } from 'app/report/report-spese/report-spese.component';
// import { UserAddComponent } from 'app/management/gestione-utente/user-add/user-add.component';
import { ProfileComponent } from 'app/profile/profile.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'manage',
    canActivate: [AuthGuard],
    component: ManagementComponent,
    children: [ 
      // {path: 'manage/userInsert', canActivate: [AuthGuard], component: UserAddComponent} 
    ]
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    children: []
  },
  
  {
    path: 'report',
    canActivate: [AuthGuard],
    component: GeneralReportComponent,
    children: [
      { path: 'incidenza', canActivate: [AuthGuard], component: IncidenzaReportComponent },
      { path: 'datirendiconti', canActivate: [AuthGuard], component: ReportRendicontiComponent },
      { path: 'datispese', canActivate: [AuthGuard], component: ReportSpeseComponent }
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false } // <-- debugging purposes only
    )],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
