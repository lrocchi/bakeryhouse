import { Balance } from "app/entity/Balance";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { BalanceService } from "app/_services/balance.service";
import { BehaviorSubject } from "rxjs";


export class BalanceDataSource implements DataSource<Balance> {

    private balancesSubject = new BehaviorSubject<Balance[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(private _balanceService: BalanceService){}

    loadBalances(id: string, from: Date, to: Date){
        this.loadingSubject.next(true);
        this._balanceService.getBalances(id, from, to).subscribe(balances => this.balancesSubject.next(balances))
    }
    
    connect(collectionViewer: CollectionViewer): Observable<Balance[]> {
        console.log("Connecting data source");
        return this.balancesSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.balancesSubject.complete();
        this.loadingSubject.complete();
    }
}