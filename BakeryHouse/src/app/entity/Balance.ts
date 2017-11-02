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
  public pos: number;
  public ticket;
  public memoCredit: number;
  public prevCapital: number;
  public capital: number;
  public flash: number;
  public riserva: number;
  public preconti: number;
  public tavoliAperti: number;

  // tslint:disable-next-line:one-line
  constructor(public cassa: number = 0){}




}

export enum BalanceType {
  Pranzo = 25,
  Pomeriggio = 50,
  Cena = 75,
  Chiusura = 100
}
