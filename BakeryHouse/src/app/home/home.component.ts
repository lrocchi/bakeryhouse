import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { User } from "app/entity/user";

@Component({

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  private jwtHelper: JwtHelper = new JwtHelper();



  public user: User;
  title = 'BakeryHouse Mgmt';

  constructor() {

     if (localStorage.getItem('token')) {

       try {
       this.user = this.jwtHelper.decodeToken(localStorage.getItem('token')).data;
       }catch (e) {
         console.error(e);
       }
    }

  }



}



