import { User } from 'app/entity/user';
import { Store } from 'app/entity/store';

export class Balance {

  /* db properties */
  public _id: string;
  public type: string;
  public value: number;
  public giorno: string = Date.now().toString();
  public user: User;
  public store: Store;

  public cassa: number;
  public pos: number;
  public ticket: number;
  public memoCredit: number;

  public prevCapital: number;
  public capital: number;




}

export enum BalanceType {
  Pranzo = 25,
  Pomeriggio = 50,
  Cena = 75,
  Chiusura = 100
}
