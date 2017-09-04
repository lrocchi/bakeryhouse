import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { DataSource } from "@angular/cdk";
import { Observable, BehaviorSubject } from "rxjs/Rx";
import { MdSort, MdRow, MdDialogRef, MdDialog } from "@angular/material";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { Cost } from "app/entity/cost";
import { SpesaService } from "app/_services/spesa.service";
import { ConfirmationDialog } from "app/confirmation-dialog/confirmation-dialog.component";


@Component({
  selector: 'app-spese-list',
  templateUrl: './spese-list.component.html',
  styleUrls: ['./spese-list.component.css']
})
export class SpeseListComponent {

  confirmDialog: MdDialogRef<ConfirmationDialog>;

  @Input() spesaList: Array<Cost> = [];

  @Output() reloadEvent = new EventEmitter();

  constructor(private _spesaService: SpesaService, public dialog: MdDialog) { }

  openConfirmationDelete(id: string) {
    this.confirmDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.confirmDialog.componentInstance.confirmMessage = "Sei sicuro di voler cancellare questo elemento?"

    this.confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        console.log("CANCELLA");
        this._spesaService.deleteCost(id)
          .then(types => { this.reloadEvent.emit(); })
          .catch(err => console.log(err));
      }
      this.confirmDialog = null;
    });

  }
}