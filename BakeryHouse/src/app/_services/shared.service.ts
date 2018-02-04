import { Injectable } from '@angular/core';
import { Cost } from 'app/entity/cost';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';

@Injectable()
export class SharedService {

  public SpesaList: Subject<Array<Cost>> = new Subject<Array<Cost>>();

  constructor() { }


}
