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

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'manage',
    canActivate: [AuthGuard],
    component: ManagementComponent,
    children: []
  },
  {
    path: 'report',
    canActivate: [AuthGuard],
    component: GeneralReportComponent,
    children: [
      { path: 'incidenza', canActivate: [AuthGuard], component: IncidenzaReportComponent },
      { path: 'datirendiconti', canActivate: [AuthGuard], component: ReportRendicontiComponent },
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
