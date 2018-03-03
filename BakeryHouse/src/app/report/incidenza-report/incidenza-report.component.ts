import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, Inject } from '@angular/core';
import {MatNativeDateModule } from '@angular/material';
import { Cost } from 'app/entity/cost';
import { SpesaService } from 'app/_services/spesa.service';
import { User } from 'app/entity/user';

import { DxChartModule} from 'devextreme-angular';


import DataSource from 'devextreme/data/data_source';
import { FormControl } from '@angular/forms';
import { ReportsService } from 'app/_services/reports.service';
import { Store } from 'app/entity/store';
// import CustomStore from 'devextreme/data/custom_store';

@Component({

  templateUrl: './incidenza-report.component.html',
  styleUrls: ['./incidenza-report.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class IncidenzaReportComponent implements OnInit {
  public costList: Array<Cost>;
  public costListJSON: string;

  /**
  const ctrl = new FormControl({value: 'n/a', disabled: true});
  console.log(ctrl.value);     // 'n/a'
  console.log(ctrl.status);   // 'DISABLED'
   */
  public dateFrom: FormControl;
  public dateTo: FormControl;

  constructor(  private _reportsService: ReportsService) { }

    ngOnInit() {
      this.getList();
      this.dateFrom = new FormControl(new Date());
      this.dateTo = new FormControl(new Date());
      // this.chartData = JSON.stringify(this.costList);
    }


    getList() {
      /* Lo user sarà selezionato dai filtri */
      const usr: User = JSON.parse(localStorage.getItem('currUser'));
      this._reportsService.getTodayIncidenza(usr.store._id)
        .then(spese => { this.costList = spese;  this.costListJSON = JSON.stringify(spese)})
        .catch(err => console.log(err));

    }

    getReport(from: Date, to: Date, store: Store){

    }

}
