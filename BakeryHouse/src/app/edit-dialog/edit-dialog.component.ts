import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from 'app/entity/store';
import { User, Ruolo } from 'app/entity/user';
import { StoreService } from 'app/_services/store.service';
import { Balance } from 'app/entity/Balance';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

title: String = 'Modifica';

  // tslint:disable-next-line:max-line-length
  vItemCurrency =  [{value: 0, multiplier: 100}, {value: 0, multiplier: 50}, {value: 0, multiplier: 20}, {value: 0, multiplier: 10}, {value: 0, multiplier: 5},
     {value: 0, multiplier: 2}, {value: 0, multiplier: 1}, {value: 0, multiplier: 0.5}, {value: 0, multiplier: 0.20}, {value: 0, multiplier: 0.10}];
  storeObj: Store = null;
  userObj: User = null;
  balanceObj: Balance = null;
  roles = Ruolo;
  public stores: Array<Store>;

  constructor(private _storeService: StoreService, public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getActiveStoresList();
  }

  getActiveStoresList() {
    this._storeService.getStoreList(true)
    .then(stores => { this.stores = stores; })
    .catch(err => console.log(err));
  }

  /* calculateSum(val: any) {
    this.balanceObj.cassa += +val;
  } */

  calculateSum() {
    this.balanceObj.cassa = 0;
    for (let j = 0; j < this.vItemCurrency.length; j++) {
      this.balanceObj.cassa += this.vItemCurrency[j].value * this.vItemCurrency[j].multiplier;
    }
  }
}
