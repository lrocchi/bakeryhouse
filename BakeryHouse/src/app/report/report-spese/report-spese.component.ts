import { Component, OnInit } from '@angular/core';
import { SpeseDataSource } from './SpeseDataSource';
import { Cost } from 'app/entity/cost';
import { FormControl } from '@angular/forms';
import { StoreService } from 'app/_services/store.service';
import { SpesaService } from 'app/_services/spesa.service';
import { PageEvent } from '@angular/material';
import { Store } from 'app/entity/store';
import { CostType } from 'app/entity/cost-type';

@Component({
  selector: 'app-report-spese',
  templateUrl: './report-spese.component.html',
  styleUrls: ['./report-spese.component.css']
})
export class ReportSpeseComponent implements OnInit {

  public dataSource: SpeseDataSource;
  public displayedColumns = ['store', 'descrizione', 'type', 'valore',  'ref_date'];
  public stores: Array<Store>;
  public costTypes: Array<CostType>;
  public selectedStoreId: string;
  public selectedTypeName: string;

  public dateFrom: FormControl;
  public dateTo: FormControl;


  // @ViewChild(MatPaginator) paginator: MatPaginator;


  // MatPaginator Inputs
  length: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];




  constructor(private _SpesaService: SpesaService, private _storeService: StoreService) {
    let user = JSON.parse(localStorage.getItem('currUser'));
    this.selectedStoreId = user.store._id;
  }

  ngOnInit() {
    this.getStoreList();
    this.getCostTypeList();
    let today = new Date();
    today.setHours(23, 0, 0, 0);

    let yesterday = new Date();
    yesterday.setHours(-24, 0, 0, 0);

    this.dateFrom = new FormControl(yesterday);
    this.dateTo = new FormControl(today);

    this.dataSource = new SpeseDataSource(/* this.paginator, */ this._SpesaService);

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

  getCostTypeList() {
    this._SpesaService.getCategoriesList()
      .then(types => { this.costTypes = types; })
      .catch(err => console.log(err));
  }



  public startSearch() {
     let filter = {};

    filter['store'] = this.selectedStoreId;
    filter['fullType.nome'] = this.selectedTypeName;
    filter['ref_date'] = { $gte: this.dateFrom.value.toISOString(), $lte: this.dateTo.value.toISOString() };
    // console.log('FILTER:' + JSON.stringify(filter));

    this.dataSource.loadCosts(filter, this.pageIndex,
      this.pageSize);
      // this.length = this.dataSource.getSize();
  }

}
