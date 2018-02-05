import { Injectable } from '@angular/core';
import { Cost } from 'app/entity/cost';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { Balance } from 'app/entity/Balance';

@Injectable()
export class SharedService {

  public SpesaList: Subject<Array<Cost>> = new Subject<Array<Cost>>();
  public lastBalance: Subject<Balance> = new Subject<Balance>();

  constructor() { }


}
