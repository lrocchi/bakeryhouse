import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

// tslint:disable-next-line:import-blacklist
import 'rxjs';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs'
import { Cost } from "app/entity/cost";
import { CostType } from "app/entity/cost-type";
import { User } from "app/entity/user";



@Injectable()
export class SpesaService {



  constructor(private _http: Http) { }

  /**
   * COST SECTION
   */
  public getSpesaList() {

    return this._http.get('api/spese').map(data => data.json()).toPromise();

  }

  public getTodaySpesaList(id_store: string) {
    console.log('================= SpesaService.getTodaySpesaList() =====================');
    console.log(id_store);
    return this._http.get('api/spese/today/' + id_store).map(data => data.json()).toPromise();

  }

  public addSpesa(spesa: Cost) {
    console.log(JSON.stringify(spesa));

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post('api/spese', spesa, options).map(data => data.json()).toPromise();

  }

  public deleteCost(id:string){
    return this._http.delete('api/spese/' + id).map(data => data.json()).toPromise();
  }



  /**
   * COSTTYPE SECTION
   */

  public addType(type: CostType) {
    console.log(JSON.stringify(type));

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

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

  public deleteCategory(id:string){
    return this._http.delete('api/costtype/' + id).map(data => data.json()).toPromise();
  }



}


