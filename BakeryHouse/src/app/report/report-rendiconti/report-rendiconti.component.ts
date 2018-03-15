import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { BalanceService } from 'app/_services/balance.service';
import { StoreService } from 'app/_services/store.service';
import { Store } from 'app/entity/store';
import { FormControl } from '@angular/forms';
import { BalanceDataSource } from './balance.datasource';

@Component({
  // selector: 'app-report-rendiconti',
  templateUrl: './report-rendiconti.component.html',
  styleUrls: ['./report-rendiconti.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class ReportRendicontiComponent implements OnInit {

  public dataSource: BalanceDataSource;
  public displayedColumns = ['store', 'type', 'ref_date', 'cassa', 'pos', 'ticket', 'prevCapital', 'flash', 'riserva', 'tavoliAperti', 'rafa', 'speseTotali'];
  public stores: Array<Store>;
  public selectedStoreId: string;

  public dateFrom: FormControl;
  public dateTo: FormControl;

  constructor(private _balanceService: BalanceService, private _storeService: StoreService) { 
    let user = JSON.parse(localStorage.getItem('currUser'));
    this.selectedStoreId = user.store._id;
  }

  ngOnInit() {
    this.getStoreList();
    let today = new Date();
    today.setHours(23,0,0,0);

    let yesterday = new Date();
    yesterday.setHours(-24,0,0,0);

    this.dateFrom = new FormControl(yesterday);
    this.dateTo = new FormControl(today);

    this.dataSource = new BalanceDataSource(this._balanceService);

    this.dataSource.loadBalances(this.selectedStoreId, this.dateFrom.value, this.dateTo.value);
  }

  getStoreList() {
    this._storeService.getStoreList(true)
      .then(stores => { this.stores = stores; })
      .catch(err => console.log(err));
  }



  public startSearch(){
    console.log("SEARCH: " + this.selectedStoreId + "-" + this.dateFrom.value + "-" + this.dateTo.value);
    this.dataSource.loadBalances(this.selectedStoreId, this.dateFrom.value, this.dateTo.value);
  }

  /* public getBalances(id: string, from: Date, to: Date) {

    this.dataSource = this._balanceService.getBalances(id, from, to);
  } */


  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

}
