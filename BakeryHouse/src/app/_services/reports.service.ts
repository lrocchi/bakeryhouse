import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class ReportsService {
  constructor(private _http: Http) {}

  public getTodayIncidenza(id_store: string) {
    // const today = new Date();
    // today.setHours(0 , 0 - today.getTimezoneOffset(), 0);
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    const myParams = new URLSearchParams();
    // myParams.set('store', id_store);
    const options = new RequestOptions({ headers: myHeaders, params: myParams });
    let sUrl = 'api/report/today';
    sUrl += '?store=' + id_store;
    return this._http
      .get(sUrl, options)
      .map(data => data.json())
      .toPromise();
  }
}
