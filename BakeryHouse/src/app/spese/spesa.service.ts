import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers} from '@angular/http';

// tslint:disable-next-line:import-blacklist
import 'rxjs';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs'
import { Spesa } from 'app/spese/spesa';

@Injectable()
export class SpesaService {



  constructor(private _http: Http) { }

  public getSpesaList() {

    return this._http.get('api/spese').map(data => data.json()).toPromise();

  }

  public getTodaySpesaList() {
    console.log('================= SpesaService.getTodaySpesaList() =====================');
    return this._http.get('api/spese/today').map(data => data.json()).toPromise();

  }

  public addSpesa(spesa: Spesa){
    console.log(JSON.stringify(spesa));

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post('api/spese',spesa,options).map(data => data.json()).toPromise();

  }
}


