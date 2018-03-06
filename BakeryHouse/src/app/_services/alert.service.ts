import { Injectable, OnInit } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { Message } from '../entity/message';
import { User } from '../entity/user';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class AlertService {

  public AlertList: Subject<Array<Message>> = new Subject<Array<Message>>();
  private user: User;


  constructor(private _http: Http) {
    this.user = JSON.parse(localStorage.getItem('currUser'));


  }



  loadUnreadAlert(): Observable<Message[]> {
    return this._http.get('api/message/unread/' + this.user._id)
    .map(res => res.json())
    .catch((error: any) => Observable.throw('Server error'));
  }

  removeMessage(mes: Message){
    return this._http.delete('api/message/' + mes._id).map(data => data.json()).toPromise();

  }

}
