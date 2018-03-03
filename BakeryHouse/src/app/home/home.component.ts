import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { User } from 'app/entity/user';
import { FlashMessagesService } from 'ngx-flash-messages';


@Component({

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


  private jwtHelper: JwtHelper = new JwtHelper();



  public user: User;
  title = 'BakeryHouse Mgmt';

  constructor(private _flashMessagesService: FlashMessagesService) {

     if (localStorage.getItem('token')) {

       try {
       this.user = this.jwtHelper.decodeToken(localStorage.getItem('token')).data;
       }catch (e) {
         console.error(e);
       }
    }

  }

  ngOnInit(): void {
    /* this._flashMessagesService.show('My component has initialized!', {
      classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
      timeout: 1000, // Default is 3000
    }); */
  }


}



