import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Balance } from 'app/entity/Balance';
import { Store } from 'app/entity/store';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class BalanceService {

  constructor(private _http: Http, private httpClient: HttpClient) { }


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

  /* public getBalances( id_store: string,  from: Date, to:Date){
    const sUrl = 'api/balance/' + id_store + '?from=' + from + '&to=' + to ;
    return this._http.get(sUrl).map(data => data.json()); // .toPromise();

  } */
  public searchBalanceSize;

  getBalances(filter: string = '', pageNumber, pageSize): Observable<Balance[]> {
    /* return this.httpClient.get('api/balance', {
      params: new HttpParams()
        .set('filter', filter)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).map(res => res["payload"]); */

    return this.httpClient.get('api/balance', {
      params: new HttpParams()
        .set('filter', filter)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(
      tap(data => {
        this.searchBalanceSize = data["size"];
        // console.log("this.searchBalanceSize:" + this.searchBalanceSize);
      }),
      map(res => res["payload"])
    );


  }


  public deleteBalance(id: string) {
    return this._http.delete('api/balance/' + id).map(data => data.json()).toPromise();
  }


  public updateBalance(balance: Balance) {
    console.log('updateBalance: ' + JSON.stringify(balance));
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    // return this._http.put('api/users/' + user._id, user, options).map(data => data.json()).toPromise();

    return this._http.put('api/balance/' + balance._id, balance, options).map(data => data.json()).toPromise();
  }

}
