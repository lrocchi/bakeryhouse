import { Component, Input, ViewChild } from '@angular/core';
import { Spesa } from 'app/spese/spesa';
import { DataSource } from "@angular/cdk";
import { Observable, BehaviorSubject } from "rxjs/Rx";
import { MdSort,MdRow } from "@angular/material";
import { SpesaService } from "app/spese/spesa.service";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-spese-list',
  templateUrl: './spese-list.component.html',
  styleUrls: ['./spese-list.component.css']
})
export class SpeseListComponent {



  @Input() spesaList: Array<Spesa> = [];

  constructor(private _spesaService: SpesaService) {}

}

