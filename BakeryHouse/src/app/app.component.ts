
import { Component, HostListener, OnInit, HostBinding } from '@angular/core';




@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {




  ngOnInit(): void {
    // Store sidenav to service

  }

  constructor () {}

  @HostBinding('class.Ccm-LoginBody') someField: boolean = false;

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    // Gestione dello scarico pagina, compresi i refresh

  }
}

