
import { Component, HostListener, OnInit } from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {




  ngOnInit(): void {
    // Store sidenav to service

  }

  constructor () {}



  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    // Gestione dello scarico pagina, compresi i refresh

  }
}

