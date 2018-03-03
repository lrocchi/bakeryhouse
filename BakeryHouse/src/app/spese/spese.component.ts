import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { SpeseNewComponent } from 'app/spese/spese-new/spese-new.component';
import { LocalStorageService } from 'ng2-webstorage';
import { NgForm } from '@angular/forms';

import { User } from 'app/entity/user';
import { Cost } from 'app/entity/cost';
import { SpesaService } from 'app/_services/spesa.service';
import { SharedService } from 'app/_services/shared.service';
import { ConfirmationDialog } from 'app/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs/Observable';

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
   confirmDialog: MatDialogRef<ConfirmationDialog>;

  // @Input() spesaList: Array<Cost> = [];
  spesaList: Array<Cost> = [];

  constructor(
    private _spesaService: SpesaService,
    private sharedService: SharedService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.sharedService.SpesaList.subscribe(value => {
      this.spesaList = value;
    });


  }

  ngOnInit(): void {
    this.usr = JSON.parse(localStorage.getItem('currUser'));
    this.today = new Date(this.usr.store.ref_date).getTime();
    this.getList();
    const timer = Observable.timer(2000, 5000);
    timer.subscribe(() => this.getList());
  }



  getList() {
    this._spesaService
      .getTodaySpesaList(this.usr.store._id)
      .then(spese => {
        // this.spesaList = spese;
        this.sharedService.SpesaList.next(spese);
        this.ref.detectChanges();
      })
      .catch(err => console.log(err));
  }

  create(spesa: Cost) {
    // console.log("ECCO");
    const tmpSpesa: Cost = spesa;
    this.message = '';
    tmpSpesa.utente = this.usr;
    tmpSpesa.store = this.usr.store;
    // console.log("tmpSpesa -->" + JSON.stringify(tmpSpesa));
    this._spesaService
      .addSpesa(tmpSpesa)
      .then(data => {
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

  openConfirmationDelete(id: string) {
    this.confirmDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.confirmDialog.componentInstance.confirmMessage = 'Sei sicuro di voler cancellare questo elemento?'

    this.confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        console.log('CANCELLA');
        this._spesaService.deleteCost(id)
          .then(types => { })
          .catch(err => console.log(err));
      }
      this.confirmDialog = null;
    });

  }
}
