import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthGuard } from "app/_guards/auth.guard";
import { AuthService } from "app/_services/auth.service";
import { LoginComponent } from "app/login/login.component";
import { HomeComponent } from "app/home/home.component";
import { Routes } from "@angular/router/router";
import { HeaderComponent } from "app/header/header.component";
import { SpeseComponent } from "app/spese/spese.component";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule, MdToolbarModule, MdButtonModule, MdIconModule, MdMenuModule, MdIconRegistry, MdDialogModule, MdDialogRef } from "@angular/material";
import { SpeseListComponent } from './spese/spese-list/spese-list.component';
import { SpeseNewComponent } from './spese/spese-new/spese-new.component';
import { CdkTableModule } from '@angular/cdk';
import { GestioneSpeseComponent } from "app/management/gestione-spese/gestione-spese.component";
import { AppRoutingModule } from "app/app-routes.component";
import { ManagementComponent } from './management/management.component';
import { CostTypeAddComponent } from './management/gestione-spese/cost-type-add/cost-type-add.component';
import { SpesaService } from "app/_services/spesa.service";
import { ConfirmationDialog } from './confirmation-dialog/confirmation-dialog.component';
import { KeysPipe } from './keys.pipe';
import { GestioneUtenteComponent } from './management/gestione-utente/gestione-utente.component';
import { UserService } from "app/_services/user.service";
import { UserAddComponent } from './management/gestione-utente/user-add/user-add.component';
import { GestioneStoreComponent } from './management/gestione-store/gestione-store.component';
import { StoreAddComponent } from './management/gestione-store/store-add/store-add.component';
import { StoreService } from "app/_services/store.service";
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ChiusureComponent } from './chiusure/chiusure.component';




/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdDialogModule,
    BrowserAnimationsModule,

  ]
})
export class DemoMaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    HeaderComponent,
    SpeseComponent,
    SpeseListComponent,
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
    ChiusureComponent

  ],

  imports: [

    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    DemoMaterialModule,
    CdkTableModule,
    MdDialogModule,
    AppRoutingModule,
    ReactiveFormsModule

  ],
  providers: [
    AuthGuard,
    AuthService,
    SpesaService,
    UserService,
    StoreService

  ],
  bootstrap: [AppComponent],
  entryComponents: [SpeseNewComponent, CostTypeAddComponent, UserAddComponent, EditDialogComponent, ConfirmationDialog, StoreAddComponent]

})

export class AppModule {
  constructor(private mdIconRegistry: MdIconRegistry, private domSanitizer: DomSanitizer) {
        mdIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
    }

}
