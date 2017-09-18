import { User } from 'app/entity/user';
import { Store } from 'app/entity/store';

export class Balance {
  public _id: string;
  public tipo: {12, 16, 20, chiusura};
  public giorno: string = Date.now().toString();
  public user: User;
  public store: Store;

  public cassa: number;
  public pos: number;
  public ticket: number;
  public memoCredit: number;

}
