import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chiusure',
  templateUrl: './chiusure.component.html',
  styleUrls: ['./chiusure.component.css']
})
export class ChiusureComponent implements OnInit {

  spinnerColor= 'red';
  spinnerMode = 'determinate';
  spinnerValue = 50;

  constructor() { }

  ngOnInit() {
  }

}
