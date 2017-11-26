import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { Cost } from 'app/entity/cost';
import { SpesaService } from 'app/_services/spesa.service';
import { User } from 'app/entity/user';

import { DxChartModule} from 'devextreme-angular';


import DataSource from 'devextreme/data/data_source';
// import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-reports',
  templateUrl: './incidenza-report.component.html',
  styleUrls: ['./incidenza-report.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class IncidenzaReportComponent implements OnInit {
  public costList: Array<Cost>;
  public costListJSON: string;




  constructor(  private _spesaService: SpesaService) { }

    ngOnInit() {
      this.getList();

      // this.chartData = JSON.stringify(this.costList);
    }


    getList() {
      /* Lo user sarà selezionato dai filtri */
      const usr: User = JSON.parse(localStorage.getItem('currUser'));
      this._spesaService.getTodaySpesaList(usr.store._id)
        .then(spese => { this.costList = spese;  this.costListJSON = JSON.stringify(spese)})
        .catch(err => console.log(err));

    }

}
