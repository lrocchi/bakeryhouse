import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";

import { BehaviorSubject } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { Cost } from "../../entity/cost";
import { SpesaService } from "app/_services/spesa.service";
// import { MatPaginator } from "@angular/material";


export class SpeseDataSource implements DataSource<Cost> {

    private CostsSubject = new BehaviorSubject<Cost[]>([]);
    public resultsLength: number = 0;
    public totalCost: number = 0;

    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(/* private paginator: MatPaginator, */ private _SpesaService: SpesaService) { }

    loadCosts(filter: {},
        pageIndex: number = 0,
        pageSize: number = 4) {
        this.loadingSubject.next(true);
        this._SpesaService.getCosts(JSON.stringify(filter), pageIndex, pageSize)
            .subscribe(Costs => {
                // console.log('searchCostSize:' + this._SpesaService.searchCostSize);
                this.resultsLength = this._SpesaService.searchCostSize;
                this.totalCost = this._SpesaService.totalCost;

                this.CostsSubject.next(Costs)
            });
    }

    connect(collectionViewer: CollectionViewer): Observable<Cost[]> {
        // console.log("Connecting data source");
        return this.CostsSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.CostsSubject.complete();
        this.loadingSubject.complete();
    }
}