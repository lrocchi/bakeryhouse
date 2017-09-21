import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'app/_services/balance.service';
import { Balance, BalanceType } from 'app/entity/Balance';
import { User } from 'app/entity/user';
import { MdDialogRef, MdDialog } from '@angular/material';
import { EditDialogComponent } from 'app/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-chiusure',
  templateUrl: './chiusure.component.html',
  styleUrls: ['./chiusure.component.css']
})
export class ChiusureComponent implements OnInit {

  message: string;
  spinnerColor = 'red';
  spinnerMode = 'determinate';
  spinnerValue = 50;

  lastBalance: Balance;
  prevCapital: number;
  usr: User;

  balance: Array<Balance>;


  // confirmDialog: MdDialogRef<ConfirmationDialog>;
  editDialog: MdDialogRef<EditDialogComponent>;

  constructor(private _balanceService: BalanceService, public dialog: MdDialog) {
    this.usr = JSON.parse(localStorage.getItem('currUser'));
  }

  ngOnInit() {
    this.getList();

  }

  getList() {

    console.log('usr -->' + JSON.stringify(this.usr));
    this._balanceService.getTodayBalanceList(this.usr.store._id)
      .then(balance => {
        this.balance = balance;

      })
      .catch(err => console.log(err));

  }


  getPrevCapital() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this._balanceService.getBalanceList(this.usr.store._id, date)
      .then(balance => {
        const tmp: Balance = balance[0];
        if (tmp) {
          this.lastBalance.prevCapital = tmp.prevCapital;
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
    balance.giorno = new Date().toString();
    balance.user = this.usr;
    balance.store = this.usr.store;
    /* if (this.lastBalance) {
      balance.tipo = this.lastBalance.tipo;
    }else {
      balance.tipo = BalanceType[25];
    } */
    balance.value = 0;

    // balance.prevCapital = this.lastBalance.prevCapital;

    this.editDialog.componentInstance.balanceObj = balance;
    this.editDialog.componentInstance.title = 'Aggiungi resoconto';

    this.editDialog.afterClosed().subscribe(result => {
      if (result) {
        console.log('opeEditDialog result: ' + result);
        this._balanceService.addBalance(this.editDialog.componentInstance.balanceObj)
          .then(value => this.getList())
          .catch(err => {
            console.log(err.message); this.message = err.message;
          });
      }
      this.editDialog.componentInstance.userObj = null;
      this.editDialog.componentInstance.stores = null;
      this.editDialog = null;
    });
  }

}
