
import { Component, HostListener, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class AppComponent implements OnInit {


   @HostBinding('class.Ccm-LoginBody') someField = false;
/*
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    // Gestione dello scarico pagina, compresi i refresh

  } */

  ngOnInit(): void {
    // Store sidenav to service

  }

  constructor () {}



}

