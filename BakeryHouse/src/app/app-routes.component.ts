import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "app/login/login.component";
import { AuthGuard } from "app/_guards/auth.guard";
import { HomeComponent } from "app/home/home.component";
import { GestioneSpeseComponent } from "app/management/gestione-spese/gestione-spese.component";

const appRoutes: Routes = [

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'gestioneSpese', component: GestioneSpeseComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true } // <-- debugging purposes only
    )],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
