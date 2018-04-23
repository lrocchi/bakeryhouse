import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

// tslint:disable-next-line:import-blacklist
import 'rxjs';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs'
import { Cost } from 'app/entity/cost';
import { CostType } from 'app/entity/cost-type';
import { User } from 'app/entity/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class SpesaService {



  constructor(private _http: Http, private httpClient: HttpClient) { }

  /**
   * COST SECTION
   */
  public getSpesaList() {

    return this._http.get('api/spese').map(data => data.json()).toPromise();

  }

  public getTodaySpesaList(id_store: string) {


    // const today = new Date();
    // today.setHours(0 , 0 - today.getTimezoneOffset(), 0);
    const myHeaders = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
    const myParams = new URLSearchParams();
    // myParams.set('store', id_store);
    const options = new RequestOptions({ headers: myHeaders,  params: myParams});
    let sUrl = 'api/spese/today';
    sUrl += '?store=' + id_store;
    return this._http.get(sUrl, options).map(data => data.json()).toPromise();
  }

  public addSpesa(spesa: Cost) {
    console.log(JSON.stringify(spesa));

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.post('api/spese', spesa, options).map(data => data.json()).toPromise();

  }

  public deleteCost(id: string) {
    return this._http.delete('api/spese/' + id).map(data => data.json()).toPromise();
  }

  public updateCost(cost: Cost) {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.put('api/spese/' + cost._id, cost, options).map(data => data.json()).toPromise();
  }

  /**
   * COSTTYPE SECTION
   */

  public addType(type: CostType) {
    console.log(JSON.stringify(type));

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.post('api/costtype', type, options).map(data => data.json()).toPromise();
  }

  public getTypeList() {

    return this._http.get('api/costtype').map(data => data.json()).toPromise();

  }

  // Lista di sottocategorie data una categoria
  public getSubTypeList(val: string) {
    console.log('PARAMETRO=' + val);
    return this._http.get('api/costtype/categories/' + val).map(data => data.json()).toPromise();

  }

  public getCategoriesList() {

    return this._http.get('api/costtype/categories').map(data => data.json()).toPromise();

  }

  public deleteCategory(id: string) {
    return this._http.delete('api/costtype/' + id).map(data => data.json()).toPromise();
  }
  public updateCostType(cost: CostType) {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.put('api/costtype/' + cost._id, cost, options).map(data => data.json()).toPromise();
  }


  public searchCostSize;
  public totalCost;

  getCosts(filter: string = '', pageNumber, pageSize): Observable<Cost[]> {
    /* return this.httpClient.get('api/balance', {
      params: new HttpParams()
        .set('filter', filter)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).map(res => res["payload"]); */

    return this.httpClient.get('api/spese', {
      params: new HttpParams()
        .set('filter', filter)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(
      tap(data => {
        this.searchCostSize = data["size"];
        this.totalCost = data["totalCost"];
        // console.log("this.searchBalanceSize:" + this.searchBalanceSize);
      }),
      map(res => res["payload"])
    );


  }

}





