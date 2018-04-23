import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { BalanceService } from 'app/_services/balance.service';
import { StoreService } from 'app/_services/store.service';
import { Store } from 'app/entity/store';
import { FormControl } from '@angular/forms';
import { BalanceDataSource } from './balance.datasource';
import { PageEvent } from '@angular/material';


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
  public selectedTypeValue: number;
  public dateFrom: FormControl;
  public dateTo: FormControl;


  // @ViewChild(MatPaginator) paginator: MatPaginator;


  // MatPaginator Inputs
  length: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];




  constructor(private _balanceService: BalanceService, private _storeService: StoreService) {
    let user = JSON.parse(localStorage.getItem('currUser'));
    this.selectedStoreId = user.store._id;
  }

  ngOnInit() {
    this.getStoreList();
    let today = new Date();
    today.setHours(23, 0, 0, 0);

    let yesterday = new Date();
    yesterday.setHours(-24, 0, 0, 0);

    this.dateFrom = new FormControl(yesterday);
    this.dateTo = new FormControl(today);

    this.dataSource = new BalanceDataSource(/* this.paginator, */ this._balanceService);

    this.startSearch();
  }


  onPaginateChange(event?: PageEvent) {
    
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    /* console.log("[length]:" + event.length);
    console.log("[pageIndex]:" + event.pageIndex);
    console.log("[pageSize]:" + event.pageSize); */
    this.startSearch();
    event.length = this.length;
  }

  getStoreList() {
    this._storeService.getStoreList(true)
      .then(stores => { this.stores = stores; })
      .catch(err => console.log(err));
  }



  public startSearch() {
     let filter = {};

    filter['store'] = this.selectedStoreId;
    filter['value'] = this.selectedTypeValue;
    filter['ref_date'] = { $gte: this.dateFrom.value.toISOString(), $lte: this.dateTo.value.toISOString() };
    // console.log('FILTER:' + JSON.stringify(filter));

    this.dataSource.loadBalances(filter, this.pageIndex,
      this.pageSize);
      // this.length = this.dataSource.getSize();
  }



  /* onRowClicked(row) {
    console.log('Row clicked: ', row);
  } */

}
