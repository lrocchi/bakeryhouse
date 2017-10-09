import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ng2-webstorage';
import { MatMenu } from '@angular/material';


import { JwtHelper } from 'angular2-jwt/angular2-jwt';
import { AuthService } from 'app/_services/auth.service';
import { User, Ruolo } from 'app/entity/user';

@Component({

  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  public user: User;
  title = 'BakeryHouse!';
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private route: ActivatedRoute,
        private router: Router,
        public auth: AuthService
        // private localStorage: LocalStorageService,
    ) {
      this.user = JSON.parse(localStorage.getItem('currUser'));


    }



  ngOnInit() {

  }




   logout() {
    console.log('logout...');

        // remove user from local storage to log user out
        this.auth.logout();

        this.router.navigate(['login']);

    }





  public loggedIn() {
    this.auth.loggedIn();
  }
}


