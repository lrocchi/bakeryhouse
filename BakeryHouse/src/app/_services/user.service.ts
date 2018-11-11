

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { User } from 'app/entity/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

  users: Observable<User[]>;
  private _users: BehaviorSubject<User[]>;
  private dataStore: {
    users: User[]
  };

  constructor(private _http: Http) {
    this.dataStore = { users: []};
    this._users = <BehaviorSubject<User[]>>new BehaviorSubject([]);
    this.users = this._users.asObservable();
   }


  public getUserList() {

    return this._http.get('api/users').map(data => data.json()).toPromise();
    // return this._http.get('api/users').map(res => <User[]>res.json());

  }

  loadAll() {
    this._http.get('api/users').subscribe(data => {
      
      this.dataStore.users = data.json();

      this._users.next(Object.assign({}, this.dataStore).users);
    }, error => console.log('Could not load users.'));
  }

  public addUser(user: User) {
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
