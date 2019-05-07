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
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/takeWhile';
import { JSONP_HOME } from '@angular/http/src/backends/browser_jsonp';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {
  private alive: boolean;
  public user: User;
  public alertList: Array<Message> = [];
  // subscription: Subscription;
  // private jwtHelper: JwtHelper = new JwtHelper();
  constructor(public vc: ViewContainerRef, public snackBar: MatSnackBar, private alertService: AlertService, private ref: ChangeDetectorRef, public auth: AuthService) {
    try {
      this.user = JSON.parse(localStorage.getItem('currUser'));  
    } catch (error) {
      console.log(error);
    }
    
    this.alive = true;

  }

  ngOnInit() {
    try {
      this.user = JSON.parse(localStorage.getItem('currUser'));  
    } catch (error) {
      console.log(error);
    }

    TimerObservable.create(0, 5000)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getAlerts();
        this.refreshUser();
      });
  }

  ngOnDestroy(): void { this.alive = false; }

  ngDoCheck(): void {
    this.refreshUser();
  }

  refreshUser() {
    try {
      this.user = JSON.parse(localStorage.getItem('currUser'));  
    } catch (error) {
      console.log(error);
    }
  }

  openSnackBar(message: Message, action: string) {

    let snackBarRef = this.snackBar.open(message.message, action, {
      //duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {

      this.alertService.removeMessage(message);
      snackBarRef.dismiss();
    });

  }
  getAlerts() {
    if(this.alertService.loadUnreadAlert() !== null) {
    this.alertService.loadUnreadAlert().subscribe(value => {
      this.alertList = value;

      this.ref.detectChanges();
    });

  }
  }




  public loggedIn() {
    this.auth.loggedIn();
  }
}