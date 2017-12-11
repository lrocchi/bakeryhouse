import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'app/_services/balance.service';
import { Balance, BalanceType } from 'app/entity/Balance';
import { User } from 'app/entity/user';
import { MatDialogRef, MatDialog } from '@angular/material';
import { EditDialogComponent } from 'app/edit-dialog/edit-dialog.component';
import { Observable, Subscription } from 'rxjs/Rx';

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
  private future: Date;
  // private futureString: string;
  public diff: number;
  private $counter: Observable<number>;
  private subscription: Subscription;
  public timerMessage: string;

  /* FINE TIMER*/

  lastBalance: Balance;
  prevCapital: number;
  usr: User;
  isChiusura = false;

  private _pranzo: Date;
  private _pomeriggio: Date;
  private _sera: Date;
  private _chiusura: Date;
  private _nextDay: Date;

  balance: Array<Balance>;

  // confirmDialog: MatDialogRef<ConfirmationDialog>;
  editDialog: MatDialogRef<EditDialogComponent>;

  constructor(
    private _balanceService: BalanceService,
    public dialog: MatDialog
  ) {
    this.usr = JSON.parse(localStorage.getItem('currUser'));
  }

  ngOnInit() {
    this._pranzo = new Date();
    this._pranzo.setHours(12);
    this._pranzo.setMinutes(30);
    this._pranzo.setSeconds(0);
    this._pomeriggio = new Date();
    this._pomeriggio.setHours(16);
    this._pomeriggio.setMinutes(30);
    this._pomeriggio.setSeconds(0);

    this._sera = new Date();
    this._sera.setHours(20);
    this._sera.setMinutes(30);
    this._sera.setSeconds(0);

    this._chiusura = new Date();
    this._chiusura.setHours(23);
    this._chiusura.setMinutes(59);
    this._chiusura.setSeconds(59);

    this._nextDay = new Date();
    this._nextDay.setHours(2);
    this._nextDay.setMinutes(59);
    this._nextDay.setSeconds(59);

    this.getList();

    /* TIMER */
    // this.future = new Date(this.futureString);
    this.$counter = Observable.interval(1000).map(x => {
      this.diff = Math.floor(
        (this.future.getTime() - new Date().getTime()) / 1000
      );

      return x;
    });

    this.subscription = this.$counter.subscribe(
      x => (this.timerMessage = this.dhms(this.diff))
    );
    /* FINE TIMER */
  }

  getList() {
    // console.log('usr -->' + JSON.stringify(this.usr));
    this._balanceService
      .getTodayBalanceList(this.usr.store)
      .then(balance => {
        this.balance = balance;
        this.lastBalance = balance[0];
      })
      .catch(err => console.log(err));

    const oDate = new Date();

    if (oDate > this._nextDay) {
      oDate.setHours(12);
      if (oDate > this._pranzo) {
        oDate.setHours(16);
      } else if (oDate > this._pomeriggio) {
        oDate.setHours(20);
      } else if (oDate > this._sera) {
        oDate.setHours(24);
      }
    } else {
      if (oDate > this._chiusura) {
        this.isChiusura = true;
      }
    }
    oDate.setMinutes(0);
    oDate.setSeconds(0);
    this.future = oDate;
    /* if (this.lastBalance) {

      switch (this.lastBalance.value) {
        case 25:
          oDate.setHours(16);
          break;
        case 50:
          oDate.setHours(20);
          break;
        case 75:
          oDate.setHours(24);
          break;
        case 100:
          oDate.setDate(oDate.getDate() + 1);
          oDate.setHours(12);
          oDate.setMinutes(0);
          oDate.setSeconds(0);
          break;
        default:

          oDate.setHours(12);

          this.future = oDate;
          break;
      }
      this.future = oDate;
    } else {
      oDate.setHours(12);

      this.future = oDate;
    } */
  }

  getPrevCapital() {
    const myDate = new Date(this.usr.store.ref_date);
    const date = new Date(myDate.setTime( myDate.getTime() - 1 * 86400000 ));

    this._balanceService
      .getBalanceList(this.usr.store._id, date)
      .then(balance => {
        const tmp: Balance = balance[0];
        if (tmp) {
          this.prevCapital = tmp.capital;
        }
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
    if (this.lastBalance) {
      balance.value = this.lastBalance.value + 25;
    } else {
      balance.value = 25;
    }
    console.log('balance.value:' + balance.value);
    balance.type = BalanceType[balance.value];
    console.log('balance.type:' + balance.type);
    // balance.prevCapital = this.lastBalance.prevCapital;

    this.editDialog.componentInstance.balanceObj = balance;
    this.editDialog.componentInstance.title = 'Aggiungi resoconto';

    this.editDialog.afterClosed().subscribe(result => {
      if (result) {
        const tmpBal = this.editDialog.componentInstance.balanceObj;

        console.log('opeEditDialog result: ' + result);
        this._balanceService
          .addBalance(tmpBal)
          .then(value => this.getList())
          .catch(err => {
            console.log(err.message);
            this.message = err.message;
          });
      }
      this.editDialog.componentInstance.balanceObj = null;
      this.editDialog = null;

      this.getList();
    });
  }

  dhms(t) {
    let days, hours, minutes, seconds;
    if (t >= 0) {
      days = Math.floor(t / 86400);
      t -= days * 86400;
      hours = Math.floor(t / 3600) % 24;
      t -= hours * 3600;
      minutes = Math.floor(t / 60) % 60;
      t -= minutes * 60;
      seconds = t % 60;
    } else {
      days = Math.floor(t / 86400);
      t -= days * 86400;
      hours = Math.floor(t / 3600) % 24;
      t -= hours * 3600;
      hours = 24 - hours;
      minutes = Math.floor(t / 60) % 60;
      t -= minutes * 60;
      minutes = 60 - minutes;
      seconds = t % 60;
      seconds = 60 - seconds;
    }
    /*
    Se ho passato da 30 minuti l'orario stabilito:
      - Inserisco un bilancio a zero;
      - mando email informativa allo store manager
    */
    if (minutes > -30) {
    }
    return [hours + 'h', minutes + 'm', seconds + 's'].join(' ');
  }
}
