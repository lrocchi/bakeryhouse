import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Store } from "app/entity/store";

@Injectable()
export class StoreService {

  constructor(private _http: Http) { }


  public getStoreList(onlyActive: boolean = true) {

    if (onlyActive) {
      return this._http.get('api/stores/active').map(data => data.json()).toPromise();
    } else {
      return this._http.get('api/stores').map(data => data.json()).toPromise();
    }
  }

  public addStore(store: Store) {
    console.log(JSON.stringify(store));

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post('api/stores', store, options).map(data => data.json()).toPromise();

  }


}
