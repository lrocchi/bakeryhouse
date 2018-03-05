import { Component, OnInit, OnDestroy, DoCheck, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ng2-webstorage';
import { MatMenu, MatSnackBar } from '@angular/material';

// import { JwtHelper } from 'angular2-jwt/angular2-jwt';
import { AuthService } from 'app/_services/auth.service';
import { User, Ruolo } from 'app/entity/user';
// import { StoreService } from 'app/_services/store.service';
import { Store } from 'app/entity/store';
import { Message } from '../entity/message';
import { AlertService } from '../_services/alert.service';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {
  public user: User;
  public alertList: Array<Message> = [];
  subscription: Subscription;

  // private jwtHelper: JwtHelper = new JwtHelper();

  constructor(public vc: ViewContainerRef, public snackBar: MatSnackBar, private alertService: AlertService, private ref: ChangeDetectorRef, public auth: AuthService) {
    this.user = JSON.parse(localStorage.getItem('currUser'));


  }
  openSnackBar(message: string, action: string) {

    let snackBarRef = this.snackBar.open(message, action, {
      //duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      //Invoca l'update sul flag letto
      snackBarRef.dismiss();
    });

  }
  getAlerts() {
    this.alertService.loadUnreadAlert().subscribe(value => {
      this.alertList = value;
      this.ref.detectChanges();
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currUser'));

    const timer = Observable.timer(2000, 60000);
    timer.subscribe(() => this.getAlerts());
  }

  ngOnDestroy(): void {}
  ngDoCheck(): void {
    this.user = JSON.parse(localStorage.getItem('currUser'));
  }



  public loggedIn() {
    this.auth.loggedIn();
  }
}
