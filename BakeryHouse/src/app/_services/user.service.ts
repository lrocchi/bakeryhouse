

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { User } from 'app/entity/user';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }


  public getUserList() {

    return this._http.get('api/users').map(data => data.json()).toPromise();

  }
  public addUser(user: User) {
    console.log(JSON.stringify(user));

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this._http.post('api/users', user, options).map(data => data.json()).toPromise();

  }

  public delete(id: string) {
    return this._http.delete('api/users/' + id).map(data => data.json()).toPromise();
  }

  public update(user: User){

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.put('api/users/' + user._id, user, options).map(data => data.json()).toPromise();
      }

}
