import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ng2-webstorage';
import { MatMenu } from '@angular/material';

// import { JwtHelper } from 'angular2-jwt/angular2-jwt';
import { AuthService } from 'app/_services/auth.service';
import { User, Ruolo } from 'app/entity/user';
// import { StoreService } from 'app/_services/store.service';
import { Store } from 'app/entity/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {

  public user: User;

  // private jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    // private route: ActivatedRoute,
    public auth: AuthService,
    // private _serviceStore: StoreService
  ) {

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currUser'));
  }

  ngOnDestroy(): void {
  }
  ngDoCheck(): void {
    this.user = JSON.parse(localStorage.getItem('currUser'));
  }

  /* logout() {
    console.log('logout...');

    // remove user from local storage to log user out
    this.auth.logout();
    this.router.navigate(['login']);
  } */



  public loggedIn() {
    this.auth.loggedIn();
  }
}
