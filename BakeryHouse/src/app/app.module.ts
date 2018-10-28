import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthGuard } from 'app/_guards/auth.guard';
import { AuthService } from 'app/_services/auth.service';
import { LoginComponent } from 'app/login/login.component';
import { HomeComponent } from 'app/home/home.component';
import { Routes } from '@angular/router/router';
import { HeaderComponent } from 'app/header/header.component';
import { SpeseComponent } from 'app/spese/spese.component';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatChipsModule, MatTableModule, MatPaginatorModule, MatSortModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/';
import { MatTooltipModule, MatSnackBarModule } from '@angular/material/';
import { MatMenu, MatProgressSpinnerModule, MatTabsModule, MatSidenavModule, MatNativeDateModule } from '@angular/material';
import { MatMenuModule, MatIconRegistry, MatDialogModule, MatDialogRef, MatSelectModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatCheckboxModule, MatExpansionModule } from '@angular/material';
import { SpeseNewComponent } from './spese/spese-new/spese-new.component';
import { CdkTableModule } from '@angular/cdk/table';
import { GestioneSpeseComponent } from 'app/management/gestione-spese/gestione-spese.component';
import { AppRoutingModule } from 'app/app-routes.component';
import { ManagementComponent } from './management/management.component';
import { CostTypeAddComponent } from './management/gestione-spese/cost-type-add/cost-type-add.component';
import { SpesaService } from 'app/_services/spesa.service';
import { ConfirmationDialog } from './confirmation-dialog/confirmation-dialog.component';
import { KeysPipe } from './keys.pipe';
import { GestioneUtenteComponent } from './management/gestione-utente/gestione-utente.component';
import { UserService } from 'app/_services/user.service';
import { UserAddComponent } from './management/gestione-utente/user-add/user-add.component';
import { GestioneStoreComponent } from './management/gestione-store/gestione-store.component';
import { StoreAddComponent } from './management/gestione-store/store-add/store-add.component';
import { StoreService } from 'app/_services/store.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ChiusureComponent } from './chiusure/chiusure.component';
import { BalanceService } from 'app/_services/balance.service';
import { GeneralReportComponent } from './report/general-report.component';
import { DxChartModule, DxDataGridModule } from 'devextreme-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoutComponent } from 'app/logout.component';
import { IncidenzaReportComponent } from './report/incidenza-report/incidenza-report.component';
import { ReportsService } from 'app/_services/reports.service';
import { ShowErrorsComponent } from './management/gestione-utente/show-error/show-errors.component';
import { SharedService } from 'app/_services/shared.service';
import { AlertService } from './_services/alert.service';


import { FlashMessagesModule } from 'ngx-flash-messages';
import { ReportRendicontiComponent } from './report/report-rendiconti/report-rendiconti.component';
import { MyDateAdapter, MY_DATE_FORMATS } from './MyDateAdapter';
import { HttpClientModule } from '@angular/common/http';
import { ReportSpeseComponent } from './report/report-spese/report-spese.component';
import { ProfileComponent } from './profile/profile.component';

import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { FilesService } from './_services/file.service';

/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSidenavModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [],
  // declarations: [FlashMessagesComponent]
})
export class DemoMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    HeaderComponent,
    SpeseComponent,
    SpeseNewComponent,
    GestioneSpeseComponent,
    ManagementComponent,
    CostTypeAddComponent,
    ConfirmationDialog,
    KeysPipe,
    GestioneUtenteComponent,
    UserAddComponent,
    GestioneStoreComponent,
    StoreAddComponent,
    EditDialogComponent,
    ChiusureComponent,
    GeneralReportComponent,
    IncidenzaReportComponent,
    ReportRendicontiComponent,
    ReportSpeseComponent,
    LogoutComponent,
    ProfileComponent,
    ShowErrorsComponent,
    FileSelectDirective
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DemoMaterialModule,
    CdkTableModule,
    MatDialogModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DxChartModule,
    DxDataGridModule,
    FlexLayoutModule,
    FlashMessagesModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    SpesaService,
    UserService,
    StoreService,
    BalanceService,
    ReportsService,
    SharedService,
    AlertService,
    FilesService,
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ],
  bootstrap: [AppComponent],
  // tslint:disable-next-line:max-line-length
  entryComponents: [SpeseNewComponent, CostTypeAddComponent, UserAddComponent, EditDialogComponent, ConfirmationDialog, StoreAddComponent]

})

export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
  }

}
