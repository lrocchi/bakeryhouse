import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Balance } from 'app/entity/Balance';

@Injectable()
export class BalanceService {

  constructor(private _http: Http) { }


  public getTodayBalanceList(id_store: string) {
    const date = new Date();

    return this._http.get('api/balance/' + date.getUTCSeconds() + '/' + id_store).map(data => data.json()).toPromise();

  }

  public getBalanceList(id_store: string, date: Date) {

    return this._http.get('api/balance/' + date.getUTCSeconds() + '/' + id_store).map(data => data.json()).toPromise();

  }

  public addBalance(balance: Balance) {
    console.log(JSON.stringify(balance));

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.post('api/balance', balance, options).map(data => data.json()).toPromise();

  }

}
