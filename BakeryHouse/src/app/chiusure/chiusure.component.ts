import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BalanceService } from 'app/_services/balance.service';
import { Balance, BalanceType } from 'app/entity/Balance';
import { User } from 'app/entity/user';
import { MatDialogRef, MatDialog } from '@angular/material';
import { EditDialogComponent } from 'app/edit-dialog/edit-dialog.component';
import { Observable, Subscription } from 'rxjs/Rx';
import { timer } from 'rxjs/observable/timer';
// import { SharedService } from "app/_services/shared.service";


@Component({
  selector: 'app-chiusure',
  templateUrl: './chiusure.component.html',
  styleUrls: ['./chiusure.component.css']
})
export class ChiusureComponent implements OnInit {
  message: string;
  spinnerColor = 'normal';
  spinnerMode = 'determinate';

  /* TIMER */
  // private future: Date;
  // private futureString: string;
  // public diff: number;
  // private $counter: Observable<number>;
  // private subscription: Subscription;
  // public timerMessage: string;

  /* FINE TIMER*/

  lastBalance: Balance;
  // prevCapital: number;
  usr: User;
  // isChiusura = false;

  /* private _pranzo: Date;
  private _pomeriggio: Date;
  private _sera: Date;
  private _chiusura: Date;
  private _nextDay: Date; */

  balance: Array<Balance>;

  // confirmDialog: MatDialogRef<ConfirmationDialog>;
  editDialog: MatDialogRef<EditDialogComponent>;

  constructor(
    private _balanceService: BalanceService,
    /* private sharedService: SharedService,*/
    private ref: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.usr = JSON.parse(localStorage.getItem('currUser'));
    /* this.sharedService.lastBalance.subscribe(value => {
      this.lastBalance = value;
    }); */
  }

  ngOnInit() {
    this.getList();
    const timer = Observable.timer(2000, 5000);
    timer.subscribe(() => this.getList());
  }

  getList() {
    this._balanceService
      .getTodayBalanceList(this.usr.store)
      .then(balanceDoc => {
        this.balance = balanceDoc;
        if (balanceDoc.length > 0) {
          // this.sharedService.lastBalance.next(balanceDoc[0]);
          this.lastBalance = balanceDoc[0];
        } else {
          this._balanceService
            .getLastBalance(this.usr.store)
            .then(lastBalanceDoc => {
               this.lastBalance = lastBalanceDoc;
              // this.sharedService.lastBalance.next(lastBalanceDoc);
            });
        }
        this.ref.detectChanges();
      })
      .catch(err => console.log(err));
  }

  openEditDialog() {
    /**
     * get Store from db
     */

    this.editDialog = this.dialog.open(EditDialogComponent, {
      disableClose: false
    });

    const balance = new Balance();
    balance.ref_date = this.usr.store.ref_date; // new Date().toString();
    balance.user = this.usr;
    balance.store = this.usr.store;
    /* if (this.lastBalance) {
      balance.type = this.lastBalance.type;
    }else {
      balance.type = BalanceType[25];
    } */
    if (this.balance[0]) {
      balance.value = this.balance[0].value + 25;
    } else {
      balance.value = 25;
    }

    balance.type = BalanceType[balance.value];

    this.editDialog.componentInstance.balanceObj = balance;
    this.editDialog.componentInstance.title = 'Aggiungi resoconto';

    this.editDialog.afterClosed().subscribe(result => {
      if (result) {
        const tmpBal = this.editDialog.componentInstance.balanceObj;

        console.log('opeEditDialog result: ' + result);
        this._balanceService
          .addBalance(tmpBal)
          .then(value => {
            this.getList()}
          )
          .catch(err => {
            console.log(err.message);
            this.message = err.message;
          });
      }
      this.editDialog.componentInstance.balanceObj = null;
      this.editDialog = null;

    });
  }
}
