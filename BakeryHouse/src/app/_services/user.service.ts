

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class UserService {

  constructor(private _http: Http) { }


  public getUserList() {

        return this._http.get('api/users').map(data => data.json()).toPromise();

      }


}
