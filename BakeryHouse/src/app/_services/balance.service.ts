import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Balance } from 'app/entity/Balance';
import { Store } from 'app/entity/store';

@Injectable()
export class BalanceService {

  constructor(private _http: Http) { }


  public getLastBalance(store: Store) {
    return this._http.get('api/balance/lastone/' + store._id).map(data => data.json()).toPromise();

  }

  public getTodayBalanceList(store: Store) {
    const date = new Date(store.ref_date);
    // console.log('store.ref_date: ' + store.ref_date);
    return this._http.get('api/balance/' + date.getUTCSeconds() + '/' + store._id).map(data => data.json()).toPromise();

  }

  public getBalanceList(id_store: string, date: Date) {

    return this._http.get('api/balance/' + date.getUTCSeconds() + '/' + id_store).map(data => data.json()).toPromise();

  }

  public addBalance(balance: Balance) {
    // console.log(JSON.stringify(balance));

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.post('api/balance', balance, options).map(data => data.json()).toPromise();

  }

  public getBalances( id_store: string = '59b1a3f62d55461228642108', from: Date, to:Date){
    const sUrl = 'api/balance/' + id_store + '?from=' + from + '&to=' + to ;
    return this._http.get(sUrl).map(data => data.json()); // .toPromise();

  }

}
