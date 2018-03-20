import { Balance } from "app/entity/Balance";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { BalanceService } from "app/_services/balance.service";
import { BehaviorSubject } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
// import { MatPaginator } from "@angular/material";


export class BalanceDataSource implements DataSource<Balance> {

    private balancesSubject = new BehaviorSubject<Balance[]>([]);
    public resultsLength: number = 0;

    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(/* private paginator: MatPaginator, */ private _balanceService: BalanceService) { }

    loadBalances(filter: {},
        pageIndex: number = 0,
        pageSize: number = 4) {
        this.loadingSubject.next(true);
        this._balanceService.getBalances(JSON.stringify(filter), pageIndex, pageSize)
            .subscribe(balances => {
                // console.log('searchBalanceSize:' + this._balanceService.searchBalanceSize);
                this.resultsLength = this._balanceService.searchBalanceSize; 
                
                this.balancesSubject.next(balances)
            });
    }

   /*  getSize(): number {
        console.log("{{BalanceDataSource}}:" + this.resultsLength);
        return this._balanceService.searchBalanceSize;
    } */
    connect(collectionViewer: CollectionViewer): Observable<Balance[]> {
        // console.log("Connecting data source");
        return this.balancesSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.balancesSubject.complete();
        this.loadingSubject.complete();
    }
}