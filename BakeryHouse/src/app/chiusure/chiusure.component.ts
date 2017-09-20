import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'app/_services/balance.service';
import { Balance } from 'app/entity/Balance';
import { User } from 'app/entity/user';

@Component({
  selector: 'app-chiusure',
  templateUrl: './chiusure.component.html',
  styleUrls: ['./chiusure.component.css']
})
export class ChiusureComponent implements OnInit {

  spinnerColor = 'red';
  spinnerMode = 'determinate';
  spinnerValue = 50;

  lastBalance: Balance;
  prevCapital: number;

  constructor(private _balanceService: BalanceService) { }

  ngOnInit() {
    this.getLastBalance();

  }

  getLastBalance() {
    const usr: User = JSON.parse(localStorage.getItem('currUser'));
    console.log('usr -->' + JSON.stringify(usr));
    this._balanceService.getTodayBalanceList(usr.store._id)
      .then(balance => {
        if (balance.length > 0) {
          this.lastBalance = balance[0];
        }else {
          this.lastBalance = new Balance();
          this.lastBalance.giorno = new Date().toString();
          this.lastBalance.user = usr;
          this.lastBalance.store = usr.store;
          this.lastBalance.tipo = this.lastBalance.tipo.Pranzo;
          this.lastBalance.value = 0;
        }

      })
      .catch(err => console.log(err));

    this._balanceService.getBalanceList(usr.store._id, new Date())
      .then(balance => {
        const tmp: Balance = balance[0];
        this.lastBalance.prevCapital = tmp.prevCapital;

      })
      .catch(err => console.log(err));
  }

}
