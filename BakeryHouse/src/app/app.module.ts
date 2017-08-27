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
import { FormsModule } from "@angular/forms";
import { SpesaService } from "app/spese/spesa.service";
import { MaterialModule, MdToolbarModule, MdButtonModule, MdIconModule, MdMenuModule, MdIconRegistry, MdDialogModule, MdDialogRef } from "@angular/material";
import { SpeseListComponent } from './spese/spese-list/spese-list.component';
import { SpeseNewComponent } from './spese/spese-new/spese-new.component';
import { CdkTableModule } from '@angular/cdk';
import { GestioneSpeseComponent } from "app/management/gestione-spese/gestione-spese.component";
import { AppRoutingModule } from "app/app-routes.component";




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
    BrowserAnimationsModule
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
    GestioneSpeseComponent

  ],
  imports: [

    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    DemoMaterialModule,
    CdkTableModule,
    MdDialogModule,
    AppRoutingModule

  ],
  providers: [
    AuthGuard,
    AuthService,
    SpesaService

  ],
  bootstrap: [AppComponent, SpeseNewComponent]

})

export class AppModule {
  constructor(private mdIconRegistry: MdIconRegistry, private domSanitizer: DomSanitizer) {
        mdIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
    }

}
