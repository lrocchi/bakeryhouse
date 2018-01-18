import { Component, OnInit, ViewChild } from '@angular/core';


import { MatDialog, MatDialogRef } from '@angular/material';
import { SpeseNewComponent } from 'app/spese/spese-new/spese-new.component';
import { LocalStorageService } from 'ng2-webstorage';
import { NgForm } from '@angular/forms';

import { User } from 'app/entity/user';
import { Cost } from 'app/entity/cost';
import { SpesaService } from 'app/_services/spesa.service';

@Component({
  selector: 'app-spese',
  templateUrl: 'spese.component.html',
  styleUrls: ['spese.component.css']
})
export class SpeseComponent implements OnInit {
  usr: User;

  public message: string;
  public visible = false;
  today: number = Date.now();
  dialogRef: MatDialogRef<SpeseNewComponent>;
  spesaList: Array<Cost>;



  constructor(private _spesaService: SpesaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.usr = JSON.parse(localStorage.getItem('currUser'));
    this.today = new Date(this.usr.store.ref_date).getTime();
    this.getList();
  }

  getList() {

    this._spesaService.getTodaySpesaList(this.usr.store._id)
      .then(spese => { this.spesaList = spese; })
      .catch(err => console.log(err));

  }

  create(spesa: Cost) {
    // console.log("ECCO");
    const tmpSpesa: Cost = spesa;
   this.message = '';
    tmpSpesa.utente = this.usr;
    tmpSpesa.store = this.usr.store;
    // console.log("tmpSpesa -->" + JSON.stringify(tmpSpesa));
    this._spesaService.addSpesa(tmpSpesa)
      .then((data) => {
        if (data.success) {
          this.getList();

        } else {
          console.log(data.message);
          this.message = data.message;
        }

      })
      .catch(err => console.log(err));
    this.closeDialog();

  }


  openDialog() {
    // this.visible = !this.visible;
    const dialogRef = this.dialog.open(SpeseNewComponent);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);

      if (result !== 'cancel') {
        // console.log(dialogRef.componentInstance.spesa);
        this.create(dialogRef.componentInstance.spesa);
      }

    });

  }

  closeDialog() {
    this.dialog.closeAll();
  }




}


